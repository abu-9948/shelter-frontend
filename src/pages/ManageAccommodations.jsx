
import React, { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AccommodationList from '../components/AccommodationList';
import Loader from '../components/Loader';
import { Plus } from 'lucide-react';

const ManageAccommodations = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccommodations();
  }, [userId]);

  const fetchAccommodations = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_ACCOMMODATION}/by-user/${userId}`);
      setAccommodations(response.data);
    } catch (error) {
      toast.error('Failed to fetch accommodations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      await axios.delete(`${process.env.REACT_APP_ACCOMMODATION}/remove/${id}`);
      toast.success('Accommodation deleted successfully');
      setAccommodations(prev => prev.filter(acc => acc._id !== id));
    } catch (error) {
      toast.error('Failed to delete accommodation');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Accommodations</h1>
          <Button 
            onClick={() => navigate('/post-accommodation')}
            className="bg-[#6366F1] hover:bg-blue-700"
          > <Plus />New Accommodation
          </Button>
        </div>

        <AccommodationList 
          accommodations={accommodations}
          isLoading={isLoading}
          isDeleting={isDeleting}
          onDelete={handleDelete}
        />
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default ManageAccommodations;