import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';

const AccommodationReviews = ({ accommodationId, userId, userName, onReviewSubmitted }) => {
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null);

    console.log(reviews)

    useEffect(() => {
        fetchReviews();
    }, [accommodationId]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_REVIEWS}/get-review/${accommodationId}`);
            if (response.data && response.data.length > 0) {
                const sortedReviews = response.data.sort((a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
                );
                setReviews(sortedReviews);
            } else {
                setReviews([]);
            }
        } catch (error) {
            if (error.response?.status === 404) {
                setReviews([]);
            } else {
                toast.error('Failed to fetch reviews');
            }
        }
    };

    const handleSubmitReview = async (formData) => {
        try {
            await axios.post(`${process.env.REACT_APP_REVIEWS}/add-review/${accommodationId}`, {
                user_id: userId,
                user_name: userName,
                rating: formData.rating,
                review_text: formData.review,
                maintenance_rating: formData.maintenanceRating,
                amenities_rating: formData.amenitiesRating,
                value_for_money_rating: formData.valueForMoneyRating,
                stay_duration: formData.stayDuration
            });

            toast.success('Review submitted successfully');
            fetchReviews();
            if (onReviewSubmitted) onReviewSubmitted();
        } catch (error) {
            throw error;
        }
    };

    const handleUpdateReview = async (formData) => {
        try {
            await axios.put(`${process.env.REACT_APP_REVIEWS}/update-review/${accommodationId}`, {
                user_id: userId,
                rating: formData.rating,
                review_text: formData.review,
                maintenance_rating: formData.maintenanceRating,
                amenities_rating: formData.amenitiesRating,
                value_for_money_rating: formData.valueForMoneyRating,
                stay_duration: formData.stayDuration
            });

            toast.success('Review updated successfully');
            setEditingReview(null);
            fetchReviews();
        } catch (error) {
            throw error;
        }
    };

    const userReview = reviews.find(review => review.user_id === userId);
    const otherReviews = reviews.filter(review => review.user_id !== userId);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {userReview && !editingReview && (
                        <div className="border-b pb-6">
                            <h3 className="text-lg font-semibold mb-4">Your Review</h3>
                            <ReviewCard
                                review={userReview}
                                isUserReview={true}
                                onEdit={() => setEditingReview(userReview)}
                            />
                        </div>
                    )}

                    {editingReview && (
                        <div className="border-b pb-6">
                            <h3 className="text-lg font-semibold mb-4">Edit Your Review</h3>
                            <ReviewForm
                                initialData={{
                                    review: editingReview.review_text,
                                    rating: editingReview.rating,
                                    maintenanceRating: editingReview.maintenance_rating,
                                    amenitiesRating: editingReview.amenities_rating,
                                    valueForMoneyRating: editingReview.value_for_money_rating,
                                    stayDuration: editingReview.stay_duration
                                }}
                                onSubmit={handleUpdateReview}
                                isEdit={true}
                                onCancel={() => setEditingReview(null)}
                            />
                        </div>
                    )}

                    {otherReviews.length > 0 && (
                        <div className="space-y-4 border-b pb-6">
                            <h3 className="text-lg font-semibold">Other Reviews</h3>
                            {otherReviews.map((review, index) => (
                                <ReviewCard
                                    key={index}
                                    review={review}
                                    isUserReview={false}
                                />
                            ))}
                        </div>
                    )}

                    {reviews.length === 0 && (
                        <div className="text-center py-6 border-b">
                            <p className="text-gray-500">No reviews yet</p>
                        </div>
                    )}

                    {userId && !userReview && !editingReview && (
                        <div className="">
                            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                            <ReviewForm
                                onSubmit={handleSubmitReview}
                            />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AccommodationReviews;