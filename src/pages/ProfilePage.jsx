import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Toaster, toast } from 'react-hot-toast';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
    AlertDialogTitle, AlertDialogTrigger
} from "../components/ui/alert-dialog";
import { useAuth } from '../contexts/AuthContext';
import { Loader2, User } from 'lucide-react';
import axios from 'axios';
import AccommodationList from '../components/AccommodationList';
import ProfileInfoCard from '../components/profile/ProfileInfoCard';
import SecurityCard from '../components/profile/SecurityCard';
import Loader from '../components/Loader';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [accommodations, setAccommodations] = useState([]);


    const navigate = useNavigate();
    const { userId, logout, token } = useAuth();

    useEffect(() => {
        fetchProfile();
        fetchUserAccommodations();
    }, [userId, token]);

    const fetchUserAccommodations = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_ACCOMMODATION}/by-user/${userId}`);
            setAccommodations(response.data.slice(0, 3));
        } catch (error) {
            console.error('Failed to fetch accommodations');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_AUTH_URL}/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfile(response.data);
            setEditedProfile(response.data);
        } catch (error) {
            toast.error('Failed to fetch profile');
        } finally {
            setIsLoading(false);
        }
    };

    const handleProfileUpdate = async () => {
        setIsActionLoading(true);

        try {
            await axios.put(
                `${process.env.REACT_APP_AUTH_URL}/${userId}`,
                {
                    name: editedProfile.name,
                    phone: editedProfile.phone
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            toast.success('Profile updated successfully');
            setProfile(editedProfile);
            setIsEditing(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setIsActionLoading(false);
        }
    };

    const handlePasswordChange = async () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }

        setIsActionLoading(true);

        try {
            await axios.post(
                `${process.env.REACT_APP_AUTH_URL}/change-password/${userId}`,
                {
                    oldPassword: passwords.oldPassword,
                    newPassword: passwords.newPassword
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            toast.success('Password changed successfully');
            setIsChangingPassword(false);
            setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to change password');
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        setIsActionLoading(true);
        try {
            await axios.delete(`${process.env.REACT_APP_AUTH_URL}/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            logout();
            navigate('/login');
        } catch (error) {
            toast.error('Failed to delete account');
        } finally {
            setIsActionLoading(false);
        }
    };

    if (isLoading) {
        return (
            <Loader />
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg--50 flex items-center justify-center">
                <p className="text-red-600">Failed to load profile</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-[#6366F1]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="py-4 flex items-center space-x-6">
                        <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center border-4 border-white">
                            <span className="font-semibold text-[#6366F1] text-4xl">
                                {profile.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="text-white">
                            <h1 className="text-2xl font-bold">{profile.name}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        <ProfileInfoCard
                            profile={profile}
                            isEditing={isEditing}
                            editedProfile={editedProfile}
                            isActionLoading={isActionLoading}
                            onEdit={() => setIsEditing(true)}
                            onCancel={() => {
                                setIsEditing(false);
                                setEditedProfile(profile);
                            }}
                            onSave={handleProfileUpdate}
                            onEditChange={(field, value) =>
                                setEditedProfile(prev => ({ ...prev, [field]: value }))
                            }
                        />

                        <SecurityCard
                            isChangingPassword={isChangingPassword}
                            passwords={passwords}
                            isActionLoading={isActionLoading}
                            onPasswordChange={handlePasswordChange}
                            onPasswordInputChange={(field, value) =>
                                setPasswords(prev => ({ ...prev, [field]: value }))
                            }
                            onCancelPasswordChange={() => {
                                setIsChangingPassword(false);
                                setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
                            }}
                            onStartPasswordChange={() => setIsChangingPassword(true)}
                        />

                        <Card className="border-red-200">
                            <CardHeader>
                                <CardTitle className="text-xl font-medium text-red-600">Delete My Account</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" className="w-full" disabled={isActionLoading}>
                                            Delete Account
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Account</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This will permanently delete your account and remove all your data.
                                                This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel disabled={isActionLoading}>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleDeleteAccount}
                                                className="bg-red-600 hover:bg-red-700"
                                                disabled={isActionLoading}
                                            >
                                                {isActionLoading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Deleting...
                                                    </>
                                                ) : 'Delete Account'}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="col-span-12 lg:col-span-8 space-y-6">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-xl font-medium">Your Accommodations</CardTitle>
                                    {accommodations.length > 0 && (
                                        <Button
                                            variant="link"
                                            onClick={() => navigate('/manage-accommodations')}
                                            className="text-[#6366F1] hover:bg-[#6366F1] hover:text-white"
                                        >
                                            View All
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <AccommodationList
                                    accommodations={accommodations}
                                    isLoading={isLoading}
                                    showActions={false}
                                    gridCols="grid-cols-1 gap-4"
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" />
        </div>
    );
};

export default ProfilePage;