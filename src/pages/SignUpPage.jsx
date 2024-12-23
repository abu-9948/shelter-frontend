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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Label } from "../components/ui/label";
import { User, Mail, Lock, Phone } from 'lucide-react';
import axios from 'axios';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post(process.env.REACT_APP_REGISTER, {
        name,
        email,
        password,
        phone: phoneNumber,
        role,
      });

      if (response.status === 201) {
        setSuccessMessage("Account created successfully! Redirecting to login...");
        // Wait for 1.5 seconds before redirecting to show the success message
        setTimeout(() => {
          navigate('/signin');
        }, 1500);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      
      if (errorMessage === 'User with this email already exists') {
        setError('An account with this email already exists. Please sign in.');
        // Redirect to signin after showing the error message
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      } else {
        setError(errorMessage || "Something went wrong during registration");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    console.log('Google Sign Up clicked');
  };

  return (
    <div className="min-h-screen bg-lime-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card className="bg-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Create an Account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your information to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Email Input */}
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
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
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
                    disabled={isLoading}
                    minLength={6}
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Your phone number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Role Select */}
              <div className="space-y-2">
                <Label htmlFor="role">I am a</Label>
                <Select
                  onValueChange={(value) => setRole(value)}
                  value={role}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Seeker">Room Seeker</SelectItem>
                    <SelectItem value="Owner">Room Owner</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-lime-600 hover:bg-lime-700"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>

              {/* Success/Error Messages */}
              {successMessage && (
                <p className="text-center text-sm text-green-600">
                  {successMessage}
                </p>
              )}
              {error && (
                <p className="text-center text-sm text-red-600">
                  {error}
                </p>
              )}

              {/* Google Sign Up */}
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
                onClick={handleGoogleSignUp}
                disabled={isLoading}
              >
                <img
                  src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
                  alt="Google"
                  className="h-4 w-4 mr-2"
                />
                Sign up with Google
              </Button>

              {/* Sign In Link */}
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a
                  href="/signin"
                  className="font-medium text-lime-600 hover:text-lime-500"
                >
                  Sign in
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;