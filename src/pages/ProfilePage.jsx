import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        role: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { userId, logout, token } = useAuth();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_GET_USER_DATA}/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfile(response.data);
            setEditedProfile(response.data);
        } catch (error) {
            setError('Failed to fetch profile');
        }
    };

    const handleProfileUpdate = async () => {
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            await axios.put(
                `${process.env.REACT_APP_UPDATE_USER_DATA}/${userId}`,
                {
                    name: editedProfile.name,
                    phone: editedProfile.phone
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setSuccess('Profile updated successfully');
            setProfile(editedProfile);
            setIsEditing(false);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordChange = async () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            await axios.post(
                `${process.env.REACT_APP_UPDATE_PASSWORD}/${userId}`,
                {
                    oldPassword: passwords.oldPassword,
                    newPassword: passwords.newPassword
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setSuccess('Password changed successfully');
            setIsChangingPassword(false);
            setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to change password');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_DELETE_USER_ACCOUNT}/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            logout();
            navigate('/login');
        } catch (error) {
            setError('Failed to delete account');
        }
    };

    return (
        <div className="min-h-screen bg-lime-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto space-y-6">
                {/* Profile Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                            {isEditing ? 'Edit your profile details' : 'View your profile details'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Name</Label>
                                {isEditing ? (
                                    <Input
                                        value={editedProfile.name}
                                        onChange={(e) => setEditedProfile({
                                            ...editedProfile,
                                            name: e.target.value
                                        })}
                                    />
                                ) : (
                                    <p className="text-gray-700">{profile.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Email</Label>
                                <p className="text-gray-700">{profile.email}</p>
                            </div>

                            <div className="space-y-2">
                                <Label>Phone</Label>
                                {isEditing ? (
                                    <Input
                                        value={editedProfile.phone}
                                        onChange={(e) => setEditedProfile({
                                            ...editedProfile,
                                            phone: e.target.value
                                        })}
                                    />
                                ) : (
                                    <p className="text-gray-700">{profile.phone}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Role</Label>
                                <p className="text-gray-700">{profile.role}</p>
                            </div>

                            {error && <p className="text-sm text-red-600">{error}</p>}
                            {success && <p className="text-sm text-green-600">{success}</p>}

                            <div className="flex gap-4">
                                {isEditing ? (
                                    <>
                                        <Button
                                            onClick={handleProfileUpdate}
                                            disabled={isLoading}
                                            className="bg-lime-600 hover:bg-lime-700"
                                        >
                                            Save Changes
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setEditedProfile(profile);
                                            }}
                                            variant="outline"
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-lime-600 hover:bg-lime-700"
                                    >
                                        Edit Profile
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Change Password Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isChangingPassword ? (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Current Password</Label>
                                    <Input
                                        type="password"
                                        value={passwords.oldPassword}
                                        onChange={(e) => setPasswords({
                                            ...passwords,
                                            oldPassword: e.target.value
                                        })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>New Password</Label>
                                    <Input
                                        type="password"
                                        value={passwords.newPassword}
                                        onChange={(e) => setPasswords({
                                            ...passwords,
                                            newPassword: e.target.value
                                        })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Confirm New Password</Label>
                                    <Input
                                        type="password"
                                        value={passwords.confirmPassword}
                                        onChange={(e) => setPasswords({
                                            ...passwords,
                                            confirmPassword: e.target.value
                                        })}
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        onClick={handlePasswordChange}
                                        disabled={isLoading}
                                        className="bg-lime-600 hover:bg-lime-700"
                                    >
                                        Change Password
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setIsChangingPassword(false);
                                            setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
                                        }}
                                        variant="outline"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <Button
                                onClick={() => setIsChangingPassword(true)}
                                className="bg-lime-600 hover:bg-lime-700"
                            >
                                Change Password
                            </Button>
                        )}
                    </CardContent>
                </Card>

                {/* Delete Account Card */}
                <Card className="border-red-200">
                    <CardHeader>
                        <CardTitle className="text-red-600">Delete Account</CardTitle>
                        <CardDescription>
                            This action cannot be undone. Please be certain.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">Delete Account</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete your account and remove all your data.
                                        This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleDeleteAccount}
                                        className="bg-red-600 hover:bg-red-700"
                                    >
                                        Delete Account
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProfilePage;