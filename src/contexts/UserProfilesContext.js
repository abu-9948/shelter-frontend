// contexts/UserProfilesContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const UserProfilesContext = createContext({});

export const useUserProfiles = () => useContext(UserProfilesContext);

export const UserProfilesProvider = ({ children }) => {
    const { token } = useAuth();
    const [userProfiles, setUserProfiles] = useState({});
    const [loadingProfiles, setLoadingProfiles] = useState(false);

    const fetchUserProfile = async (userId) => {
        // If we already have the profile or are currently fetching it, don't fetch again
        if (userProfiles[userId]) return userProfiles[userId];

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_AUTH_URL}/${userId}`,
                { headers: { Authorization: `Bearer ${token}` }}
            );
            
            setUserProfiles(prev => ({
                ...prev,
                [userId]: response.data
            }));
            
            return response.data;
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            return null;
        }
    };

    const fetchMultipleProfiles = async (userIds) => {
        setLoadingProfiles(true);
        try {
            // Filter out userIds we already have
            const newUserIds = userIds.filter(id => !userProfiles[id]);
            
            // Fetch all new profiles in parallel
            await Promise.all(
                newUserIds.map(userId => fetchUserProfile(userId))
            );
        } catch (error) {
            toast.error('Failed to fetch some user profiles');
        } finally {
            setLoadingProfiles(false);
        }
    };

    const addUserProfile = (userId, profileData) => {
        setUserProfiles(prev => ({
            ...prev,
            [userId]: profileData
        }));
    };

    return (
        <UserProfilesContext.Provider value={{
            userProfiles,
            loadingProfiles,
            fetchUserProfile,
            fetchMultipleProfiles,
            addUserProfile
        }}>
            {children}
        </UserProfilesContext.Provider>
    );
};