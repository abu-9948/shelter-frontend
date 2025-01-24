import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import ProfileInfoCard from '../components/profile/ProfileInfoCard';
import SecurityCard from '../components/profile/SecurityCard';
import Loader from '../components/Loader';
import PropertiesSection from '../components/profile/PropertiesSection';
import ProfileHeader from '../components/profile/ProfileHeader';
import AccountDeleteCard from '../components/profile/AccountDeleteCard';

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
    const [favorites, setFavorites] = useState([]);

    const navigate = useNavigate();
    const { userId, logout, token } = useAuth();

    useEffect(() => {
        fetchProfile();
        fetchUserAccommodations();
        fetchUserFavorites();
    }, [userId, token]);

    const fetchUserAccommodations = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_ACCOMMODATION}/by-user/${userId}`);
            console.log(response)
            setAccommodations(response.data);
        } catch (error) {
            console.error('Failed to fetch accommodations');
        }
    };

    const fetchUserFavorites = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_ACCOMMODATION}/favs/${userId}`);

            console.log("response: ", response.data)
            setFavorites(response.data);
        } catch (error) {
            console.error('Failed to fetch favorites');
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
        return <Loader />;
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-red-600">Failed to load profile</p>
            </div>
        );
    }

    const handleToggleFavorite = async (accommodationId, isFavorite) => {
        console.log("accommodationId: ", accommodationId)
        try {
            if (isFavorite) {
                await axios.delete(`${process.env.REACT_APP_ACCOMMODATION}/favs/remove/${userId}`, { 
                    data: { accommodationId } 
                  });
            } else {
                await axios.post(`${process.env.REACT_APP_ACCOMMODATION}/favs/add/${userId}`, { accommodationId });
            }
            fetchUserFavorites();
            toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
        } catch (error) {
            toast.error('Failed to update favorites');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <ProfileHeader profile={profile} />

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
                        <AccountDeleteCard
                            handleDeleteAccount={handleDeleteAccount}
                            isActionLoading={isActionLoading}
                        />
                    </div>

                    <div className="col-span-12 lg:col-span-8 space-y-6">
                        <PropertiesSection
                            accommodations={accommodations}
                            favorites={favorites}
                            isLoading={isLoading}
                            userId={userId}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    </div>
                </div>
            </div>
            <Toaster position="top-center" />
        </div>
    );
};

export default ProfilePage;