import React, { useState } from 'react';
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Clock, Edit2, MessageSquare } from 'lucide-react';
import ReplySection from './ReplySection';

const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
        }
    }
    return 'just now';
};

const formatRating = (rating) => {
    if (!rating && rating !== 0) return '0';
    const numRating = Number(rating);
    if (isNaN(numRating)) return '0';
    return Number.isInteger(numRating) ? numRating.toString() : numRating.toFixed(1);
};

const ReviewCard = ({ review, isUserReview, onEdit, userId, userName, accommodationId }) => {
    const [showReplies, setShowReplies] = useState(false);

    const ProfileImage = ({ user }) => (
        <div className={`h-10 w-10 rounded-full ${isUserReview ? 'bg-violet-200' : 'bg-gray-200'} flex items-center justify-center overflow-hidden`}>
            <span className={`font-semibold ${isUserReview ? 'text-violet-700' : 'text-gray-700'}`}>
                {user.user_name?.charAt(0).toUpperCase()}
            </span>
        </div>
    );

    return (
        <Card className={isUserReview ? 'border-violet-200 bg-violet-50' : ''}>
            <CardContent className="pt-4">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <ProfileImage user={review} />
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {review.user_name}
                                        {isUserReview && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={onEdit}
                                                className="text-violet-600"
                                            >
                                                Edit <Edit2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </p>

                                </div>
                            </div>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {timeAgo(review.updatedAt)}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 my-3 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">Overall:</span>
                                <span className="font-semibold">{formatRating(review.rating)}/5</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">Maintenance:</span>
                                <span className="font-semibold">{formatRating(review.maintenance_rating)}/5</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">Amenities:</span>
                                <span className="font-semibold">{formatRating(review.amenities_rating)}/5</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">Value:</span>
                                <span className="font-semibold">{formatRating(review.value_for_money_rating)}/5</span>
                            </div>
                        </div>

                        {review.stay_duration && (
                            <div className="text-sm text-gray-600 mb-3">
                                Stay Duration: {review.stay_duration}
                            </div>
                        )}

                        <p className="text-gray-700 bg-white p-4 rounded-lg border">
                            {review.review_text}
                        </p>
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowReplies(!showReplies)}
                        className="text-violet-600"
                    >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {showReplies ? 'Hide Replies' : 'Show Replies'}
                    </Button>
                </div>

                {showReplies && (
                    <ReplySection
                        reviewId={review.review_id}
                        userId={userId}
                        userName={userName}
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default ReviewCard;