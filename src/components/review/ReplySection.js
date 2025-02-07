import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { MessageSquare, Trash2, Reply, Loader2, Clock } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useUserProfiles } from '../../contexts/UserProfilesContext';

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

const ReplySection = ({ reviewId, isUserReview, userId, accommodationId, reviewUserId }) => {
    const [replies, setReplies] = useState([]);
    const [replyText, setReplyText] = useState('');
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nestedReplies, setNestedReplies] = useState({});
    const [showNestedReplyInput, setShowNestedReplyInput] = useState({});
    const [nestedReplyText, setNestedReplyText] = useState({});
    const [ownerStatuses, setOwnerStatuses] = useState({});

    const { userProfiles, fetchMultipleProfiles } = useUserProfiles();

    useEffect(() => {
        fetchReplies();
    }, [reviewId]);

    const fetchReplies = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_REPLY}/get-reply/${reviewId}`);
            const mainReplies = response.data
                .filter(reply => !reply.parent_reply_id)
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            setReplies(mainReplies);
            console.log(mainReplies)

            // Get user profiles
            const userIds = new Set(response.data.map(reply => reply.user_id));
            await fetchMultipleProfiles(Array.from(userIds));

            // Check for owners
            const ownerChecks = {};
            await Promise.all(
                Array.from(userIds).map(async (uid) => {
                    const isOwner = await checkIsOwner(uid, accommodationId);
                    ownerChecks[uid] = isOwner;
                })
            );
            setOwnerStatuses(ownerChecks);

            // Fetch nested replies
            mainReplies.forEach(reply => {
                fetchNestedReplies(reply.reply_id);
            });
        } catch (error) {
            console.error('Error fetching replies:', error);
            toast.error('Failed to fetch replies');
        }
    };

    const fetchNestedReplies = async (replyId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_REPLY}/get-reply-reply/${replyId}`);
            const nestedRepliesData = response.data
            .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));

            // Get user profiles for nested replies
            const userIds = new Set(nestedRepliesData.map(reply => reply.user_id));
            await fetchMultipleProfiles(Array.from(userIds));

            // Check for owners
            const ownerChecks = {};
            await Promise.all(
                Array.from(userIds).map(async (uid) => {
                    if (ownerStatuses[uid] === undefined) {
                        const isOwner = await checkIsOwner(uid, accommodationId);
                        ownerChecks[uid] = isOwner;
                    }
                })
            );
            setOwnerStatuses(prev => ({ ...prev, ...ownerChecks }));

            setNestedReplies(prev => ({
                ...prev,
                [replyId]: nestedRepliesData
            }));
        } catch (error) {
            console.error('Error fetching nested replies:', error);
            toast.error('Failed to fetch nested replies');
        }
    };

    const handleSubmitReply = async () => {
        if (!replyText.trim()) {
            toast.error('Please write a reply');
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_REPLY}/add-reply/${reviewId}`, {
                user_id: userId,
                reply_text: replyText
            });

            setReplyText('');
            setShowReplyInput(false);
            fetchReplies();
            toast.success('Reply added successfully');
        } catch (error) {
            toast.error('Failed to add reply');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitNestedReply = async (parentReplyId) => {
        const replyTextValue = nestedReplyText[parentReplyId];
        if (!replyTextValue?.trim()) {
            toast.error('Please write a reply');
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_REPLY}/reply-reply/${parentReplyId}`, {
                user_id: userId,
                review_id: reviewId,
                reply_text: replyTextValue
            });

            setNestedReplyText(prev => ({ ...prev, [parentReplyId]: '' }));
            setShowNestedReplyInput(prev => ({ ...prev, [parentReplyId]: false }));
            fetchNestedReplies(parentReplyId);
            toast.success('Reply added successfully');
        } catch (error) {
            toast.error('Failed to add reply');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteReply = async (replyId, isNested = false) => {
        try {
            const endpoint = isNested
                ? `${process.env.REACT_APP_REPLY}/delete-reply-reply/${replyId}`
                : `${process.env.REACT_APP_REPLY}/delete-reply/${replyId}`;

            await axios.delete(endpoint);
            toast.success('Reply deleted successfully');
            fetchReplies();
        } catch (error) {
            toast.error('Failed to delete reply');
        }
    };

    const ProfileImage = ({ userId }) => {
        const profile = userProfiles[userId];
        // const isOwner = ownerStatuses[userId];
        // const isAuthor = userId === reviewUserId;

        // const getBadgeStyle = () => {
        //     if (isOwner) return 'bg-blue-200 text-blue-700';
        //     if (isAuthor) return 'bg-violet-200 text-violet-700';
        //     return '';
        // };

        return (
            <div className={`h-8 w-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center overflow-hidden`}>
                <span className="font-semibold">
                    {profile?.name?.charAt(0).toUpperCase() || '?'}
                </span>
            </div>
        );
    };

    const ReplyComponent = ({ reply, isNested = false }) => {
        const profile = userProfiles[reply.user_id];
        const isOwner = ownerStatuses[reply.user_id];
        const isAuthor = reply.user_id === reviewUserId;
        const isCurrentUserReply = userId === reply.user_id;

        const handleNestedReplyTextChange = (e) => {
            const value = e.target.value;
            setNestedReplyText(prev => ({
                ...prev,
                [reply.reply_id]: value
            }));
        };

        const getRoleBadge = () => {
            if (isOwner) {
                return (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        Owner
                    </span>
                );
            }
            if (isAuthor) {
                return (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-700">
                        Author
                    </span>
                );
            }
            return null;
        };

        return (
            <div className={`${isNested ? 'ml-8 border-r-0' : ''} mb-2 rounded-lg border border-1`}>
                <div className="p-4 rounded-lg group/reply hover:bg-blue-50/50 transition-colors">
                    <div className="flex items-center gap-2 mb-2 justify-between">
                        <div className="flex items-center gap-2">
                            <ProfileImage userId={reply.user_id} />
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-900">
                                        {profile?.name || 'Loading...'}
                                    </span>
                                    {getRoleBadge()}
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {timeAgo(reply.created_at || reply.updatedAt)}
                        </p>
                    </div>

                    <div className="ml-10">
                        <div className="flex items-center gap-2">
                            <p className="text-gray-700 flex-grow">{reply.reply_text}</p>
                            <div className="opacity-0 group-hover/reply:opacity-100 transition-opacity flex items-center gap-2 ml-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setShowNestedReplyInput(prev => ({
                                            ...prev,
                                            [reply.reply_id]: !prev[reply.reply_id]
                                        }));
                                    }}
                                    className="text-gray-500 hover:text-gray-700 px-2 py-1"
                                >
                                    <Reply className="h-4 w-4 mr-1" />
                                    Reply
                                </Button>

                                {isCurrentUserReply && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDeleteReply(reply.reply_id, isNested)}
                                        className="text-red-500 hover:text-red-700 px-2 py-1"
                                    >
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        Delete
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {showNestedReplyInput[reply.reply_id] && (
                    <div className="ml-10 mt-2 p-3">
                        <Textarea
                            key={`nested-reply-${reply.reply_id}`}
                            value={nestedReplyText[reply.reply_id] || ''}
                            onChange={handleNestedReplyTextChange}
                            placeholder="Write your reply..."
                            className="min-h-[80px] mb-2"
                            autoFocus
                        />
                        <div className="flex gap-2">
                            <Button
                                onClick={() => handleSubmitNestedReply(reply.reply_id)}
                                disabled={loading}
                                className="bg-violet-600 hover:bg-violet-700"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : 'Send Reply'}
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setShowNestedReplyInput(prev => ({
                                        ...prev,
                                        [reply.reply_id]: false
                                    }));
                                    setNestedReplyText(prev => ({
                                        ...prev,
                                        [reply.reply_id]: ''
                                    }));
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}

                {nestedReplies[reply.reply_id]?.map(nestedReply => (
                    <ReplyComponent
                        key={nestedReply.reply_id}
                        reply={nestedReply}
                        isNested={true}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="">
            <div className="flex items-center gap-2 mb-4">
                <Button
                    variant="ghost"
                    onClick={() => setShowReplyInput(!showReplyInput)}
                    className="text-violet-600"
                >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {showReplyInput ? 'Cancel Reply' : 'Reply to Review'}
                </Button>
            </div>

            {showReplyInput && (
                <div className="mb-4">
                    <Textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your reply..."
                        className="min-h-[80px] mb-2"
                    />
                    <Button
                        onClick={handleSubmitReply}
                        disabled={loading}
                        className="bg-violet-600 hover:bg-violet-700"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : 'Send Reply'}
                    </Button>
                </div>
            )}

            <div className="space-y-2">
                {replies.map(reply => (
                    <ReplyComponent key={reply.reply_id} reply={reply} />
                ))}
            </div>
        </div>
    );
};

export default ReplySection;