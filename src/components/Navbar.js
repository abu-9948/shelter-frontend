import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "./ui/button";
import { Menu, X, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const DesktopAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <User className="h-4 w-4" />
              {user?.name || 'Account'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return (
      <>
        <Link to="/signin">
          <Button variant="outline">Sign In</Button>
        </Link>
        <Link to="/signup">
          <Button className="bg-[#6366F1] hover:bg-[#4b4ef7]">Sign Up</Button>
        </Link>
      </>
    );
  };

  const MobileAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <>
          <Link
            to="/profile"
            className="text-gray-700 hover:text-[#6366F1] px-2 py-1 transition-colors flex items-center gap-2"
            onClick={closeMobileMenu}
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
          <Button
            variant="ghost"
            onClick={() => {
              logout();
              closeMobileMenu();
            }}
            className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50 w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </>
      );
    }
    return (
      <>
        <Link to="/signin" onClick={closeMobileMenu}>
          <Button variant="outline" className="w-full">Sign In</Button>
        </Link>
        <Link to="/signup" onClick={closeMobileMenu}>
          <Button className="w-full bg-[#6366F1] hover:bg-blue-700">Sign Up</Button>
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
            <Link to="/" className="text-2xl font-bold text-[#6366F1] flex items-center justify-center">
              <img
                src="/favicon.svg"
                alt="Google"
                className="h-14"
              />
              Shelter Finder
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#6366F1] transition-colors">
              Home
            </Link>
            <Link to="/accommodations" className="text-gray-700 hover:text-[#6366F1] transition-colors">
              Find Accommodation
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-[#6366F1] transition-colors">
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
                className="text-gray-700 hover:text-[#6366F1] px-2 py-1 transition-colors"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/accommodations"
                className="text-gray-700 hover:text-[#6366F1] px-2 py-1 transition-colors"
                onClick={closeMobileMenu}
              >
                Find Accommodation
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-[#6366F1] px-2 py-1 transition-colors"
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

export default Navigation;