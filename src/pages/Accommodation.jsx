import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import AccommodationForm from '../components/AccommodationForm';
import { Button } from "../components/ui/button";
import { ArrowLeft } from 'lucide-react';
import Loader from '../components/Loader';

const Accommodation = () => {
    const [accommodation, setAccommodation] = useState({
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
        description: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const { userId } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            fetchAccommodation();
        }
    }, [id]);

    const fetchAccommodation = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_ACCOMMODATION}/${id}`);
            setAccommodation(response.data);
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

    const handleSubmit = async () => {
        if (!accommodation.name || !accommodation.location || !accommodation.price) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsSaving(true);
        try {
            if (isEditMode) {
                await axios.put(`${process.env.REACT_APP_ACCOMMODATION}/update/${id}`, {
                    ...accommodation,
                    user_id: userId
                });
                toast.success('Accommodation updated successfully!');
            } else {
                const response = await axios.post(`${process.env.REACT_APP_ACCOMMODATION}/add/${userId}`, {
                    ...accommodation,
                    price: Number(accommodation.price),
                    available_spaces: Number(accommodation.available_spaces),
                });
                if (response.status === 201) {
                    toast.success('Accommodation posted successfully!');
                }
            }
            navigate('/manage-accommodations');
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data?.error ||
                `Failed to ${isEditMode ? 'update' : 'post'} accommodation`;
            toast.error(errorMessage);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {isEditMode && (
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/manage-accommodations')}
                        className="mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Accommodations
                    </Button>
                )}

                <AccommodationForm
                    accommodation={accommodation}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    isLoading={isSaving}
                    isEdit={isEditMode}
                    onCancel={() => navigate('/manage-accommodations')}
                />
            </div>
            <Toaster position="top-center" />
        </div>
    );
};

export default Accommodation;