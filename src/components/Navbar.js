import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import { motion, AnimatePresence } from 'framer-motion';

const NavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative text-gray-700 hover:text-[#6366F1] transition-colors after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#6366F1] after:transition-all hover:after:w-full ${
        isActive ? 'text-[#6366F1] after:w-full' : ''
      }`}
    >
      {children}
    </Link>
  );
};

const AuthButtons = ({ isMobile = false, onClose }) => {
  const { isAuthenticated, logout, user } = useAuth();

  if (isAuthenticated) {
    if (isMobile) {
      return (
        <div className="flex flex-col space-y-2">
          <Link
            to="/profile"
            className="text-gray-700 hover:text-[#6366F1] px-2 py-1 transition-colors flex items-center gap-2"
            onClick={onClose}
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
          <Button
            variant="ghost"
            onClick={() => {
              logout();
              onClose?.();
            }}
            className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50 w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      );
    }

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

  const buttonClass = isMobile ? "w-full" : "";
  
  return (
    <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-4'}`}>
      <Link to="/signin" onClick={onClose}>
        <Button variant="outline" className={buttonClass}>Sign In</Button>
      </Link>
      <Link to="/signup" onClick={onClose}>
        <Button className={`bg-[#6366F1] hover:bg-[#4b4ef7] ${buttonClass}`}>Sign Up</Button>
      </Link>
    </div>
  );
};

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/accommodations", label: "Find Accommodation" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0 flex items-center"
          >
            <Link to="/" className="text-2xl font-bold text-[#6366F1] flex items-center justify-center">
              <img src="/favicon.svg" alt="Logo" className="h-14" />
              <span className="ml-2">Shelter Finder</span>
            </Link>
          </motion.div>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}

            <Link to={isAuthenticated ? "/post-accommodation" : "/signin"}>
              <Button variant="outline" className="mr-4">
                Post Accommodation
              </Button>
            </Link>

            <AuthButtons />
          </div>

          <motion.div 
            className="lg:hidden"
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </motion.div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden py-4 border-t border-gray-200"
            >
              <div className="flex flex-col space-y-4 px-4">
                {navLinks.map((link) => (
                  <NavLink key={link.to} to={link.to} onClick={closeMobileMenu}>
                    {link.label}
                  </NavLink>
                ))}
                
                <Link
                  to={isAuthenticated ? "/post-accommodation" : "/signin"}
                  onClick={closeMobileMenu}
                >
                  <Button variant="outline" className="w-full">
                    Post Accommodation
                  </Button>
                </Link>

                <AuthButtons isMobile onClose={closeMobileMenu} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;