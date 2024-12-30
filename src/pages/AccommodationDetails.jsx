import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import {
    Building2,
    MapPin,
    DollarSign,
    Star,
    Phone,
    Users,
    Hash,
    Clock,
    Loader2,
    ArrowLeft
} from 'lucide-react';
import Loader from '../components/Loader';

const AccommodationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userId } = useAuth();

    const [accommodation, setAccommodation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState();
    const [reviews, setReviews] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchAccommodationDetails();
    }, [id]);

    const fetchAccommodationDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_ACCOMMODATION}/room/${id}`);
            setAccommodation(response.data);
            setReviews(response.data.reviews || []);
        } catch (error) {
            toast.error('Failed to fetch accommodation details');
            navigate('/accommodations');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitReview = async () => {
        if (!review.trim()) {
            toast.error('Please write a review');
            return;
        }

        setIsSubmitting(true);
        try {
            await axios.post(`${process.env.REACT_APP_ACCOMMODATION}/${id}/reviews`, {
                userId,
                rating,
                comment: review
            });

            toast.success('Review submitted successfully');
            setReview('');
            setRating(5);
            fetchAccommodationDetails();
        } catch (error) {
            toast.error('Failed to submit review');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <Loader />
        );
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
                                <span className="font-semibold text-[#6366F1]">{accommodation.rating}/5</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                {accommodation.companyName && <div className="flex items-center">
                                    <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                                    <span className="text-gray-600">{accommodation.companyName}</span>
                                </div>}

                                <div className="flex items-center">
                                    <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                                    <span className="text-gray-600">₹{accommodation.price}/month</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                                    <span className="text-gray-600">{accommodation.phone}</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                                    <span className="text-gray-600">{accommodation.available_spaces} spaces available</span>
                                </div>
                                <div className="flex items-center">
                                    <Hash className="h-5 w-5 text-gray-400 mr-2" />
                                    <span className="text-gray-600">Flat: {accommodation.flatNumber}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Description</h3>
                            <p className="text-gray-600">{accommodation.description}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Address</h3>
                            <p className="text-gray-600">{accommodation.address}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Amenities</h3>
                            <div className="flex flex-wrap gap-2">
                                {/* {accommodation.amenities?.split(',').map((amenity, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                                    >
                                        {amenity.trim()}
                                    </span>
                                ))} */}
                                {accommodation.amenities}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Reviews</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Add Review */}
                        {userId && (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-600">Your Rating:</span>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                className="h-5 w-5"
                                                fill={star <= rating ? "gold" : "none"}
                                                stroke={star <= rating ? "gold" : "currentColor"}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <Textarea
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    placeholder="Write your review..."
                                    className="min-h-[100px]"
                                />
                                <Button
                                    onClick={handleSubmitReview}
                                    disabled={isSubmitting}
                                    className="bg-[#6366F1] hover:bg-blue-600"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : 'Submit Review'}
                                </Button>
                            </div>
                        )}

                        {/* Review List */}
                        <div className="space-y-4">
                            {reviews.map((review, index) => (
                                <Card key={index}>
                                    <CardContent className="pt-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center">
                                                <span className="font-semibold mr-2">{review.userName}</span>
                                                <div className="flex">
                                                    {[...Array(review.rating)].map((_, i) => (
                                                        <Star key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <p className="text-gray-600">{review.comment}</p>
                                    </CardContent>
                                </Card>
                            ))}
                            {reviews.length === 0 && (
                                <p className="text-center text-gray-500">No reviews yet</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Toaster position="top-center" />
        </div>
    );
};

export default AccommodationDetails;