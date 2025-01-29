import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { getUserType } from '../utils/userType';
import {
    Building2,
    MapPin,
    IndianRupee,
    Star,
    Phone,
    Users,
    Hash,
    ArrowLeft
} from 'lucide-react';
import Loader from '../components/Loader';
import AccommodationReviews from '../components/review/AccommodationReviews';
import ImageGallery from '../components/ImageGallery';

const AccommodationDetails = () => {
    const { accommodation_id } = useParams();
    const navigate = useNavigate();
    const { userId, userName } = useAuth();
    
    const [accommodation, setAccommodation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        fetchAccommodationDetails();
    }, [accommodation_id]);

    const fetchAccommodationDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_ACCOMMODATION}/${accommodation_id}`);
            setAccommodation(response.data);
        } catch (error) {
            toast.error('Failed to fetch accommodation details');
            navigate('/accommodations');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    if (!accommodation) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Accommodation not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={() => navigate('/accommodations')}
                    className="mb-4"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Accommodations
                </Button>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Image Gallery */}
                <ImageGallery images={accommodation.images} />

                {/* Accommodation Details Card */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-3xl font-bold mb-2">{accommodation.name}</CardTitle>
                                <div className="flex items-center text-gray-500">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>{accommodation.location}</span>
                                </div>
                            </div>
                            <div className="flex items-center bg-violet-100 px-3 py-1 rounded-full">
                                <Star className="h-5 w-5 text-[#6366F1] mr-1" fill="currentColor" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                {accommodation.companyName && (
                                    <div className="flex items-center">
                                        <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                                        <span className="text-gray-600">{accommodation.companyName}</span>
                                    </div>
                                )}
                                <div className="flex items-center">
                                    <IndianRupee className="h-5 w-5 text-gray-400 mr-2" />
                                    <span className="text-gray-600">{accommodation.price}/month</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                                    <span className="text-gray-600">{accommodation.phone}</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                                    <span className="text-gray-600">{accommodation.available_spaces} members</span>
                                </div>
                                <div className="flex items-center">
                                    <Hash className="h-5 w-5 text-gray-400 mr-2" />
                                    <span className="text-gray-600">Flat: {accommodation.flatNumber}</span>
                                </div>
                            </div>
                        </div>
                        
                        {accommodation.description && (
                            <div>
                                <h3 className="font-semibold mb-2">Description</h3>
                                <p className="text-gray-600">{accommodation.description}</p>
                            </div>
                        )}
                        
                        {accommodation.address && (
                            <div>
                                <h3 className="font-semibold mb-2">Address</h3>
                                <p className="text-gray-600">{accommodation.address}</p>
                            </div>
                        )}

                        <div>
                            {accommodation?.amenities && Object.values(accommodation.amenities)[0]?.toString().trim() && (
                                <>
                                    <h3 className="font-semibold mb-2">Amenities</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.values(accommodation.amenities)[0]?.toString().split(',').map((item, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm mr-2 mb-2 inline-block"
                                            >
                                                {item.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <AccommodationReviews
                    accommodationId={accommodation_id}
                    userId={userId}
                    userName={userName}
                    onReviewSubmitted={fetchAccommodationDetails}
                />
            </div>
            <Toaster position="top-center" />
        </div>
    );
};

export default AccommodationDetails;