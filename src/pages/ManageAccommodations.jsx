
import React, { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AccommodationList from '../components/AccommodationList';

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
      const response = await axios.get(`${process.env.REACT_APP_ACCOMMODATION}/${userId}`);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-lime-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Accommodations</h1>
          <Button 
            onClick={() => navigate('/post-accommodation')}
            className="bg-lime-600 hover:bg-lime-700"
          >
            Add New
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