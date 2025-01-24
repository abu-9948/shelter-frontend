import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import AccommodationForm from '../components/AccommodationForm';
import { useNavigate, useBeforeUnload } from 'react-router-dom';

const AUTOSAVE_KEY = 'accommodation_draft';

const PostAccommodation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [accommodation, setAccommodation] = useState(() => {
    const savedDraft = localStorage.getItem(AUTOSAVE_KEY);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        if (parsed.images) {
          parsed.images = parsed.images.map(img => ({
            ...img,
            file: img.data ? dataURLtoFile(img.data, img.name) : null,
            preview: img.data
          }));
        }
        return parsed;
      } catch (error) {
        console.error('Error parsing saved draft:', error);
      }
    }
    return {
      name: '',
      location: '',
      roomType: '',
      occupancyType: '',
      price: '',
      companyName: '',
      amenities: '',
      phone: '',
      available_spaces: '',
      flatNumber: '',
      address: '',
      description: '',
      images: []
    };
  });


  const { userId } = useAuth();
  const navigate = useNavigate();

  const dataURLtoFile = (dataurl, filename) => {
    if (!dataurl) return null;
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      const processedImages = accommodation.images.map(image => {
        if (image instanceof File) {
          return URL.createObjectURL(image);
        }
        return image;
      });

      const dataToSave = {
        ...accommodation,
        images: processedImages
      };

      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(dataToSave));

      return () => {
        processedImages.forEach(path => {
          if (path.startsWith('blob:')) {
            URL.revokeObjectURL(path);
          }
        });
      };
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [accommodation]);
  useEffect(() => {
    const saveTimeout = setTimeout(async () => {
      const dataToSave = {
        ...accommodation,
        images: accommodation.images.map(image => ({
          name: image.file?.name,
          type: image.file?.type,
          data: image.preview,
          isExisting: image.isExisting,
          url: image.url
        }))
      };
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(dataToSave));
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [accommodation]);

  useEffect(() => {
    return () => {
      const shouldClearDraft = localStorage.getItem('clearAccommodationDraft');
      if (shouldClearDraft === 'true') {
        localStorage.removeItem(AUTOSAVE_KEY);
        localStorage.removeItem('clearAccommodationDraft');
      }
      if (localStorage.getItem(AUTOSAVE_KEY)) {
        toast.success("Your previous draft has been restored.")
      }
    }
  }, []);

  useBeforeUnload(
    React.useCallback((e) => {
      if (Object.values(accommodation).some(value => value !== '' && value?.length !== 0)) {
        e.preventDefault();
        return e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    }, [accommodation])
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccommodation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'name', 'location', 'price', 'phone',
      'available_spaces', 'flatNumber', 'roomType', 'occupancyType'
    ];

    const missingFields = requiredFields.filter(field => !accommodation[field]);

    if (missingFields.length > 0) {
      toast.error(`Please fill all required fields: ${missingFields.join(', ')}`);
      return false;
    }

    if (accommodation.phone && !/^\d{10}$/.test(accommodation.phone)) {
      toast.error('Phone number must be 10 digits');
      return false;
    }

    if (accommodation.images.length === 0) {
      toast.error('Please upload at least one image');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const formDataToSend = new FormData();

      Object.keys(accommodation).forEach(key => {
        if (key !== 'images') {
          if (key === 'price' || key === 'available_spaces') {
            formDataToSend.append(key, Number(accommodation[key]));
          } else {
            formDataToSend.append(key, accommodation[key]);
          }
        }
      });

      if (typeof accommodation.amenities === 'string') {
        const amenitiesArray = accommodation.amenities
          .split(',')
          .map(item => item.trim())
          .filter(item => item);
        formDataToSend.append('amenities', JSON.stringify(amenitiesArray));
      }

      accommodation.images.forEach(image => {
        if (image.file) {
          formDataToSend.append('images', image.file);
        }
      });

      const response = await axios.post(
        `${process.env.REACT_APP_ACCOMMODATION}/add/${userId}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      if (response.status === 201) {
        localStorage.setItem('clearAccommodationDraft', 'true');
        toast.success('Accommodation posted successfully!');
        navigate('/manage-accommodations');
      }
    } catch (error) {
      console.error('Error posting accommodation:', error);
      toast.error(error.response?.data?.error || 'Failed to post accommodation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <AccommodationForm
          accommodation={accommodation}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          isEdit={false}
        />
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default PostAccommodation;