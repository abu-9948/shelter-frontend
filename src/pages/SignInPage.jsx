import React, { useState } from 'react';
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
import { Mail, Lock } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Cookies from 'js-cookie';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignIn = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(process.env.REACT_APP_LOGIN, { email, password }, { withCredentials: true });

      const token = Cookies.get('token');
      console.log("token: ", token)
      const data = response.data;
      console.log("data: ", data)
      if (!data) {
        setError("Looks like you don't have an account please signed up.");
      } else {
        if (token) {
          login(token);
          navigate('/');
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      switch (errorMessage) {
        case 'User not found':
          setError('No account found with this email. Please sign up first.');
          break;
        case 'Invalid credentials':
          setError('Incorrect password. Please try again.');
          break;
        default:
          setError(error.response?.data?.message || 'Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_FORGOT_PASSWORD, {
        email,
      });
      console.log(response)
      setForgotPasswordMessage('Password reset link sent to your email.');
    } catch (error) {
      setForgotPasswordMessage(
        error.response?.data?.message || 'Something went wrong'
      );
    }
  };

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
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button
                  onClick={handleForgotPassword}
                  className="w-full bg-lime-600 hover:bg-lime-700"
                >
                  Send Reset Link
                </Button>
                <p className="text-center text-sm text-gray-600">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setForgotPassword(false)}
                    className="text-lime-600 hover:text-lime-500"
                  >
                    Back to Sign In
                  </Button>
                </p>
                <p className="text-center text-sm text-gray-600">
                  {forgotPasswordMessage}
                </p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSignIn}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
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
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-lime-600 hover:bg-lime-700"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
                <div className="relative">
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
                  onClick={() => console.log('Google Sign-In clicked')}
                >
                  <img
                    src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
                    alt="Google"
                    className="h-4 w-4 mr-2"
                  />
                  Sign in with Google
                </Button>
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a
                    href="/signup"
                    className="font-medium text-lime-600 hover:text-lime-500"
                  >
                    Sign up
                  </a>
                </p>
                <p className="text-center text-sm text-red-600">{error}</p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;