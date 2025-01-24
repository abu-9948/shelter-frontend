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
import { Mail, Lock, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Cookies from 'js-cookie';
import { Toaster, toast } from 'react-hot-toast';
import Loader from '../components/Loader';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [resetLinkLoading, setResetLinkLoading] = useState(false);

  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get('token');
        if (token && user) {
          navigate('/');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setPageLoading(false);
      }
    };

    checkAuth();
  }, [user, navigate]);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (!password) {
      toast.error("Password is required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_AUTH_URL}/login`,
        { email: email.toLowerCase(), password },
        { withCredentials: true }
      );

      const { token } = response.data;
      if (token) {
        await login(token);
        navigate('/');
      } else {
        toast.error("Authentication failed");
      }
    } catch (error) {
      const message = error.response?.data?.message;

      switch (error.response?.status) {
        case 400:
          toast.error(message === 'User not found' ?
            'Account not found. Please sign up first.' :
            'Invalid credentials');
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error(message || 'Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!validateEmail(email)) {
      setForgotPasswordMessage("Please enter a valid email address");
      return;
    }

    setResetLinkLoading(true);
    setForgotPasswordMessage('');

    try {
      await axios.post(
        `${process.env.REACT_APP_AUTH_URL}/request-password-reset`,
        { email }
      );
      setForgotPasswordMessage('Password reset link sent to your email');
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      switch (status) {
        case 404:
          setForgotPasswordMessage('No account found with this email');
          break;
        case 429:
          setForgotPasswordMessage('Too many attempts. Please try again later.');
          break;
        default:
          setForgotPasswordMessage(message || 'Failed to send reset link');
      }
    } finally {
      setResetLinkLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="min-h-screen bg-lime-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card className="bg-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {forgotPassword ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="reset-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="pl-10"
                      disabled={resetLinkLoading}
                      required
                    />
                  </div>
                </div>
                <Button
                  onClick={handleForgotPassword}
                  disabled={resetLinkLoading}
                  className="w-full bg-lime-600 hover:bg-lime-700"
                >
                  {resetLinkLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setForgotPassword(false);
                    setForgotPasswordMessage('');
                  }}
                  className="w-full text-lime-600 hover:text-lime-500"
                  disabled={resetLinkLoading}
                >
                  Back to Sign In
                </Button>
                {forgotPasswordMessage && (
                  <p className={`text-center text-sm ${forgotPasswordMessage.includes('sent')
                    ? 'text-green-600'
                    : 'text-red-600'
                    }`}>
                    {forgotPasswordMessage}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="pl-10"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => setForgotPassword(true)}
                      className="text-sm text-lime-600 hover:text-lime-500"
                      disabled={isLoading}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSignIn}
                  disabled={isLoading}
                  className="w-full bg-lime-600 hover:bg-lime-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
                {/* <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  <img
                    src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
                    alt="Google"
                    className="h-4 w-4 mr-2"
                  />
                  Sign in with Google
                </Button> */}
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a
                    href="/signup"
                    className="font-medium text-lime-600 hover:text-lime-500"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Toaster position="top-center"/>
    </div>
  );
};

export default SignInPage;