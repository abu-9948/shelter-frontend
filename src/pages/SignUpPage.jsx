import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { User, Mail, Lock, Phone, Loader2 } from 'lucide-react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!name.trim()) return "Name is required";
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email";
    if (!password || password.length < 6) return "Password must be at least 6 characters";
    if (!phoneNumber.trim()) return "Phone number is required";
    return null;
  };

  const handleSignUp = async () => {
    const validationError = validateInputs();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(`${process.env.REACT_APP_AUTH_URL}/register`, {
        name,
        email: email.toLowerCase(),
        password,
        phone: phoneNumber
      });

      toast.success("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate('/signin'), 1500);
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      const validationErrors = error.response?.data?.errors;
      
      if (validationErrors) {
        toast.error(validationErrors.map(err => err.msg).join(', '));
      } else if (errorMessage === 'User with this email already exists') {
        toast.error('An account with this email already exists. Please sign in.');
        setTimeout(() => navigate('/signin'), 2000);
      } else {
        toast.error(errorMessage || "Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-lime-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card className="bg-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">Enter your information to create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    value={name}
                    placeholder="John Doe"
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    placeholder="your@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    placeholder="Your phone number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                onClick={handleSignUp}
                className="w-full bg-lime-600 hover:bg-lime-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : 'Create Account'}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                disabled={isLoading}
              >
                <img
                  src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
                  alt="Google"
                  className="h-4 w-4 mr-2"
                />
                Sign up with Google
              </Button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/signin" className="font-medium text-lime-600 hover:text-lime-500">
                  Sign in
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster position="top-center"/>
    </div>
  );
};

export default SignUpPage;