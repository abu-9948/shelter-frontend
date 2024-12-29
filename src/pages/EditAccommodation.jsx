// pages/EditAccommodation.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import AccommodationForm from '../components/AccommodationForm';
import { Button } from "../components/ui/button";
import { ArrowLeft, Loader2 } from 'lucide-react';

const EditAccommodation = () => {
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
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const { userId } = useAuth();
    const { id } = useParams();
    console.log(id)
    const navigate = useNavigate();

    useEffect(() => {
        fetchAccommodation();
    }, []);

    const fetchAccommodation = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_ACCOMMODATION}/room/${id}`);
            setAccommodation(response.data);
            console.log(accommodation)
        } catch (error) {
            if (error.response?.status === 404) {
                toast.error('Accommodation not found');
            } else if (error.response?.status === 400) {
                toast.error('Invalid accommodation ID');
            } else {
                toast.error('Failed to fetch accommodation details');
            }
            navigate('/manage-accommodations');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccommodation(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        if (!accommodation.name || !accommodation.location || !accommodation.price) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsSaving(true);
        try {
            await axios.put(`${process.env.REACT_APP_ACCOMMODATION}/update/${id}`, {
                ...accommodation,
                user_id: userId
            });

            toast.success('Accommodation updated successfully!');
            navigate('/manage-accommodations');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update accommodation');
        } finally {
            setIsSaving(false);
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
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/manage-accommodations')}
                        className="mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Accommodations
                    </Button>
                </div>

                <AccommodationForm
                    accommodation={accommodation}
                    onChange={handleChange}
                    onSubmit={handleUpdate}
                    isLoading={isSaving}
                    isEdit={true}
                    onCancel={() => navigate('/manage-accommodations')}
                />
            </div>
            <Toaster position="top-center" />
        </div>
    );
};

export default EditAccommodation;