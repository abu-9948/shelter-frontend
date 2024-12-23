import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Menu, X, User, LogIn, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Desktop auth buttons component
  const DesktopAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <Button 
          variant="ghost" 
          className="flex items-center"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      );
    }

    return (
      <>
        <Link to="/signin">
          <Button variant="ghost" className="flex items-center">
            <LogIn className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </Link>
        <Link to="/signup">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <User className="h-4 w-4 mr-2" />
            Sign Up
          </Button>
        </Link>
      </>
    );
  };

  // Mobile auth buttons component
  const MobileAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <Button 
          variant="ghost" 
          className="justify-start w-full"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      );
    }

    return (
      <>
        <Link to="/signin" onClick={closeMobileMenu}>
          <Button variant="ghost" className="justify-start w-full">
            <LogIn className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </Link>
        <Link to="/signup" onClick={closeMobileMenu}>
          <Button className="bg-blue-600 hover:bg-blue-700 justify-start w-full">
            <User className="h-4 w-4 mr-2" />
            Sign Up
          </Button>
        </Link>
      </>
    );
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              ShelterFinder
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/accommodations" className="text-gray-700 hover:text-blue-600 transition-colors">
              Find Accommodation
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>

            {/* Post Accommodation Button */}
            <Link to={isAuthenticated ? "/post-accommodation" : "/signin"}>
              <Button variant="outline" className="mr-4">
                Post Accommodation
              </Button>
            </Link>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <DesktopAuthButtons />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="flex flex-col space-y-4 px-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 px-2 py-1 transition-colors"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/accommodations" 
                className="text-gray-700 hover:text-blue-600 px-2 py-1 transition-colors"
                onClick={closeMobileMenu}
              >
                Find Accommodation
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-blue-600 px-2 py-1 transition-colors"
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link 
                to={isAuthenticated ? "/post-accommodation" : "/signin"}
                onClick={closeMobileMenu}
              >
                <Button variant="outline" className="justify-start w-full">
                  Post Accommodation
                </Button>
              </Link>
              <div className="flex flex-col space-y-2">
                <MobileAuthButtons />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;