// pages/PostAccommodation.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import AccommodationForm from '../components/AccommodationForm';
import { useNavigate } from 'react-router-dom';

const PostAccommodation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [accommodation, setAccommodation] = useState({
    name: '',
    location: '',
    price: '',
    rating: '',
    companyName: '',
    amenities: '',
    phone: '',
    available_spaces: '',
    flatNumber: '',
    address: '',
    description: ''
  });

  const { userId } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccommodation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!accommodation.name || !accommodation.location || !accommodation.price) {
      toast.error('Please fill required fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_ACCOMMODATION}/add/${userId}`, {
        ...accommodation,
        price: Number(accommodation.price),
        available_spaces: Number(accommodation.available_spaces),
        rating: Number(accommodation.rating) || 0
      });

      if (response.status === 201) {
        toast.success('Accommodation posted successfully!');
        navigate('/manage-accommodations');
      }
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error('User not found');
      } else {
        toast.error(error.response?.data?.error || 'Failed to post accommodation');
      }
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