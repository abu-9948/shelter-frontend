import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { MessageSquare, Trash2, Reply, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getUserType } from '../../utils/userType';
import { useUserProfiles } from '../../contexts/UserProfilesContext';

const ReplySection = ({ reviewId, userId, accommodationId }) => {
    const [replies, setReplies] = useState([]);
    const [replyText, setReplyText] = useState('');
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nestedReplies, setNestedReplies] = useState({});
    const [showNestedReplyInput, setShowNestedReplyInput] = useState({});
    const [nestedReplyText, setNestedReplyText] = useState({});

    const { userProfiles, fetchMultipleProfiles } = useUserProfiles();

    useEffect(() => {
        fetchReplies();
    }, [reviewId]);

    const ProfileImage = ({ userId }) => {
        const profile = userProfiles[userId];
        return (
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {profile?.profile_image ? (
                    <img
                        src={profile.profile_image}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="font-semibold text-gray-700">
                        {profile?.name?.charAt(0).toUpperCase() || '?'}
                    </span>
                )}
            </div>
        );
    };

    const fetchReplies = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_REPLY}/get-reply/${reviewId}`);

            // Filter out nested replies from the main list
            const mainReplies = response.data.filter(reply => !reply.parent_reply_id);
            setReplies(mainReplies);

            // Collect all unique user IDs
            const userIds = new Set();
            response.data.forEach(reply => userIds.add(reply.user_id));

            // Fetch profiles for all users at once
            await fetchMultipleProfiles(Array.from(userIds));

            // Fetch nested replies for each reply
            mainReplies.forEach(reply => {
                fetchNestedReplies(reply.reply_id);
            });
        } catch (error) {
            console.error('Error fetching replies:', error);
        }
    };

    const fetchNestedReplies = async (replyId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_REPLY}/get-reply-reply/${replyId}`);
            const nestedRepliesData = response.data;

            // Collect user IDs from nested replies
            const userIds = new Set(nestedRepliesData.map(reply => reply.user_id));
            await fetchMultipleProfiles(Array.from(userIds));

            setNestedReplies(prev => ({
                ...prev,
                [replyId]: nestedRepliesData
            }));
        } catch (error) {
            console.error('Error fetching nested replies:', error);
        }
    };

    const handleSubmitReply = async () => {
        if (!replyText.trim()) {
            toast.error('Please write a reply');
            return;
        }

        setLoading(true);
        try {
            const currentUser = userProfiles[userId];
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
            const currentUser = userProfiles[userId];
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
                : `${process.env.REACT_APP_REPLY}/delete-reply/${replyId}`

            await axios.delete(endpoint);
            toast.success('Reply deleted successfully');
            fetchReplies();
        } catch (error) {
            toast.error('Failed to delete reply');
        }
    };


    const ReplyComponent = ({ reply, isNested = false }) => {
        const [replyUserType, setReplyUserType] = useState(null);
        const profile = userProfiles[reply.user_id];

        useEffect(() => {
            const checkUserType = async () => {
                const type = await getUserType(
                    accommodationId,
                    reply.user_id,
                    reviewId
                );
                setReplyUserType(type);
            };
            checkUserType();
        }, [reply.user_id]);

        const handleNestedReplyTextChange = (e) => {
            const value = e.target.value;
            setNestedReplyText(prev => ({
                ...prev,
                [reply.reply_id]: value
            }));
        };

        return (
            <div className={`p-3 rounded-lg ${isNested ? 'ml-8 bg-gray-50' : 'bg-white border'} mb-2`}>
                <div className="flex items-center gap-2 mb-2">
                    <ProfileImage userId={reply.user_id} />
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-900">
                            {profile?.name || 'Loading...'}
                            {replyUserType &&
                                <span className="ml-2 text-sm font-normal text-gray-500">
                                    ({replyUserType})
                                </span>
                            }
                        </span>
                    </div>
                </div>

                <p className="text-gray-700 ml-10">{reply.reply_text}</p>

                <div className="mt-2 ml-10 flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            setShowNestedReplyInput(prev => ({
                                ...prev,
                                [reply.reply_id]: !prev[reply.reply_id]
                            }));
                        }}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <Reply className="h-4 w-4 mr-1" />
                        Reply
                    </Button>

                    {reply.user_id === userId && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteReply(reply.reply_id, isNested)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                        </Button>
                    )}
                </div>

                {showNestedReplyInput[reply.reply_id] && (
                    <div className="ml-10 mt-2">
                        <Textarea
                            value={nestedReplyText[reply.reply_id] || ''}
                            onChange={handleNestedReplyTextChange}
                            placeholder="Write your reply..."
                            className="min-h-[80px] mb-2"
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
        <div className="mt-4">
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