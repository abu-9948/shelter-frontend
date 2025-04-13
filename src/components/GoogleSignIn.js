// components/GoogleSignIn.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "./ui/button";
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const GoogleSignIn = ({ onSuccess, isLoading, setIsLoading }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (!window.google || !GOOGLE_CLIENT_ID) return;

      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-button"),
          { 
            type: "standard",
            theme: "outline",
            size: "large",
            width: document.getElementById("google-signin-button").offsetWidth,
            text: "signin_with"
          }
        );
      } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
      }
    };

    // Load the Google API Script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [GOOGLE_CLIENT_ID]);

  const handleCredentialResponse = async (response) => {
    setIsLoading(true);
    try {
      console.log("Google response:", response);
      const res = await axios.post(
        `${process.env.REACT_APP_AUTH_URL}/google-signin`,
        { token: response.credential },
        { withCredentials: true }
      );

      const { token, user } = res.data;
      if (token) {
        await login(token);
        toast.success('Successfully signed in with Google!');
        if (onSuccess) onSuccess();
        navigate('/');
      }
    } catch (error) {
      console.error('Google sign in error:', error);
      toast.error(error.response?.data?.message || 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <Button
          variant="outline"
          className="w-full"
          disabled
        >
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing in...
        </Button>
      ) : (
        <div 
          id="google-signin-button"
          className="w-full flex justify-center"
        />
      )}
    </div>
  );
};

export default GoogleSignIn;