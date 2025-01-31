import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Clock, Edit2, MessageSquare } from 'lucide-react';
import ReplySection from './ReplySection';
import axios from 'axios';

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

// Simple function to check if user is owner
const checkIsOwner = async (userId, accommodationId) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_ACCOMMODATION}/by-user/${userId}`);
        return response.data.some(accom => accom._id === accommodationId);
    } catch (error) {
        console.error('Failed to check ownership:', error);
        return false;
    }
};

const ReviewCard = ({ review, onEdit, userId, userName, accommodationId }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [isCurrentUserAuthor, setIsCurrentUserAuthor] = useState(false);

    useEffect(() => {
        const loadRoles = async () => {
            // Check if review creator is owner
            const ownerStatus = await checkIsOwner(review.user_id, accommodationId);
            setIsOwner(ownerStatus);

            // Check if current user is the author of this review
            setIsCurrentUserAuthor(userId === review.user_id);
        };

        loadRoles();
    }, [review, userId, accommodationId]);

    const getBadgeStyle = () => {
        if (isOwner) {
            return 'bg-blue-100 text-blue-700 border-blue-200';
        }
        return 'bg-gray-100 text-gray-700 border-gray-200';
    };

    const getCardStyle = () => {
        if (!isCurrentUserAuthor) return '';
        return 'border-violet-200 bg-violet-50';
    };

    const ProfileImage = ({ user }) => (
        <div className={`h-10 w-10 rounded-full ${getBadgeStyle()} flex items-center justify-center overflow-hidden`}>
            <span className="font-semibold">
                {user.user_name?.charAt(0).toUpperCase()}
            </span>
        </div>
    );

    return (
        <Card className={getCardStyle()}>
            <CardContent className="pt-4">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <ProfileImage user={review} />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-gray-900">
                                            {review.user_name}
                                        </p>
                                        {isOwner && (
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700`}>
                                                Owner
                                            </span>
                                        )}
                                    </div>
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

                        {isCurrentUserAuthor && (
                            <div className="mt-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={onEdit}
                                    className="text-violet-600"
                                >
                                    Edit <Edit2 className="h-4 w-4 ml-1" />
                                </Button>
                            </div>
                        )}
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
                        accommodationId={accommodationId}
                        reviewUserId={review.user_id}
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default ReviewCard;