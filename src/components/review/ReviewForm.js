import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Star, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

const ReviewForm = ({
    onSubmit,
    initialData = null,
    isEdit = false,
    onCancel = null
}) => {
    const [formData, setFormData] = useState({
        review: '',
        rating: 0,
        maintenanceRating: 0,
        amenitiesRating: 0,
        valueForMoneyRating: 0,
        stayDuration: '',
        ...initialData
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.review.trim()) {
            toast.error('Please write a review');
            return;
        }
        if (formData.rating === 0) {
            toast.error('Please select an overall rating');
            return;
        }
        if (formData.maintenanceRating === 0) {
            toast.error('Please rate the maintenance');
            return;
        }
        if (formData.amenitiesRating === 0) {
            toast.error('Please rate the amenities');
            return;
        }
        if (formData.valueForMoneyRating === 0) {
            toast.error('Please rate the value for money');
            return;
        }
        if (!formData.stayDuration) {
            toast.error('Please select your stay duration');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            if (!isEdit) {
                setFormData({
                    review: '',
                    rating: 0,
                    maintenanceRating: 0,
                    amenitiesRating: 0,
                    valueForMoneyRating: 0,
                    stayDuration: ''
                });
            }
        } catch (error) {
            toast.error('Failed to submit review');
        } finally {
            setIsSubmitting(false);
        }
    };

    const RatingInput = ({ label, value, onChange }) => (
        <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{label}:</span>
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onChange(star)}
                        className="focus:outline-none"
                    >
                        <Star
                            className="h-5 w-5"
                            fill={star <= value ? "#6366F1" : "none"}
                            stroke={star <= value ? "#6366F1" : "currentColor"}
                        />
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                    <RatingInput
                        label="Overall Rating"
                        value={formData.rating}
                        onChange={(val) => setFormData(prev => ({ ...prev, rating: val }))}
                    />
                    <RatingInput
                        label="Maintenance"
                        value={formData.maintenanceRating}
                        onChange={(val) => setFormData(prev => ({ ...prev, maintenanceRating: val }))}
                    />
                </div>
                <div className="space-y-3">
                    <RatingInput
                        label="Amenities"
                        value={formData.amenitiesRating}
                        onChange={(val) => setFormData(prev => ({ ...prev, amenitiesRating: val }))}
                    />
                    <RatingInput
                        label="Value for Money"
                        value={formData.valueForMoneyRating}
                        onChange={(val) => setFormData(prev => ({ ...prev, valueForMoneyRating: val }))}
                    />
                </div>
            </div>

            <div>
                <label className="text-sm text-gray-600 block mb-2">Stay Duration:</label>
                <Select
                    value={formData.stayDuration}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, stayDuration: value }))}
                >
                    <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="How long have you stayed?" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Less than 6 months">Less than 6 months</SelectItem>
                        <SelectItem value="6-12 months">6-12 months</SelectItem>
                        <SelectItem value="1-2 years">1-2 years</SelectItem>
                        <SelectItem value="More than 2 years">More than 2 years</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Textarea
                value={formData.review}
                onChange={(e) => setFormData(prev => ({ ...prev, review: e.target.value }))}
                placeholder="Write your review..."
                className="min-h-[100px] bg-white"
            />

            <div className="flex gap-2">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-violet-600 hover:bg-violet-700 text-white"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {isEdit ? 'Updating...' : 'Submitting...'}
                        </>
                    ) : isEdit ? 'Update Review' : 'Submit Review'}
                </Button>
                {onCancel && (
                    <Button
                        type="button"
                        onClick={onCancel}
                        variant="outline"
                    >
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
};

export default ReviewForm;