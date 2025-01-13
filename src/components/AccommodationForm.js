import React, { useState } from 'react';
import { Building2, MapPin, IndianRupee, Building, Phone, Users, Hash, FileText, Home, User } from 'lucide-react';
import ProgressSteps from './ProgressSteps';
import FormSection from './FormSection';
import ImageUpload from './ImageUpload';

const AccommodationForm = ({
  accommodation,
  onChange,
  onSubmit,
  isLoading,
  isEdit,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState(accommodation.images || []);

  const handleImageUpload = (newImages) => {
    setImages(prev => [...prev, ...newImages]);
    onChange({ target: { name: 'images', value: [...images, ...newImages] } });
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onChange({ target: { name: 'images', value: newImages } });
  };

  const formSections = {
    1: {
      title: isEdit ? 'Edit Accommodation' : 'Post New Accommodation',
      fields: [
        { 
          label: 'Property Name', 
          name: 'name', 
          icon: Building2, 
          required: true, 
          placeholder: 'Enter property name' 
        },
        { 
          label: 'Room Type', 
          name: 'roomType', 
          icon: Home, 
          required: true,
          isSelect: true,
          options: [
            { value: 'pg_hostel', label: 'PG/Hostel' },
            { value: 'full_house', label: 'Full House' },
            { value: 'flatmates', label: 'Flatmates' }
          ]
        },
        { 
          label: 'Occupancy Type', 
          name: 'occupancyType', 
          icon: User, 
          required: true,
          isSelect: true,
          options: [
            { value: 'boys', label: 'Boys' },
            { value: 'ladies', label: 'Ladies' },
            { value: 'coliving', label: 'Co-living/Bachelor' },
            { value: 'family', label: 'Family' }
          ]
        },
        { 
          label: 'Location', 
          name: 'location', 
          icon: MapPin, 
          required: true, 
          placeholder: 'Enter city or area' 
        },
        { 
          label: 'Monthly Price', 
          name: 'price', 
          icon: IndianRupee, 
          type: 'number', 
          required: true, 
          placeholder: 'Enter monthly rent' 
        },
      ]
    },
    2: {
      title: isEdit ? 'Edit Accommodation' : 'Post New Accommodation',
      fields: [
        { label: 'Company Name', name: 'companyName', icon: Building, placeholder: 'Enter company name' },
        { label: 'Phone Number', name: 'phone', icon: Phone, required: true, placeholder: 'Enter 10-digit number' },
        { label: 'Available Spaces', name: 'available_spaces', icon: Users, type: 'number', required: true, placeholder: 'Enter number of spaces' },
        { label: 'Flat Number', name: 'flatNumber', icon: Hash, required: true, placeholder: 'Enter flat/unit number' },
        { label: 'Full Address', name: 'address', icon: FileText, isTextarea: true, placeholder: 'Enter complete address details' },
      ]
    },
    3: {
      title: isEdit ? 'Edit Accommodation' : 'Post New Accommodation',
      fields: [
        { label: 'Amenities', name: 'amenities', icon: FileText, isTextarea: true, placeholder: 'List amenities (e.g., WiFi, Parking, Gym)' },
        { label: 'Description', name: 'description', icon: FileText, isTextarea: true, placeholder: 'Enter detailed description of the property' },
        {
          label: 'Images',
          name: 'images',
          isCustom: true,
          render: () => (
            <ImageUpload
              images={images}
              onImageUpload={handleImageUpload}
              onRemoveImage={handleRemoveImage}
              disabled={isLoading}
            />
          )
        }
      ]
    }
  };

  const handleFormSubmit = async () => {
    const formData = new FormData();
    
    // Append all form fields
    Object.keys(accommodation).forEach(key => {
      if (key !== 'images') {
        formData.append(key, accommodation[key]);
      }
    });

    // Append images
    images.forEach(image => {
      if (image instanceof File) {
        formData.append('images', image);
      }
    });

    onSubmit(formData);
  };

  const handlePrevious = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 3));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ProgressSteps currentStep={currentStep} />
      
      <FormSection
        {...formSections[currentStep]}
        currentStep={currentStep}
        totalSteps={3}
        values={accommodation}
        onChange={onChange}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleFormSubmit}
        onCancel={onCancel}
        isLoading={isLoading}
        isEdit={isEdit}
      />
    </div>
  );
};

export default AccommodationForm;