import React from 'react';
import { Button } from "../components/ui/button";
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Building2, 
  MessageSquare, 
  Users, 
  Shield, 
  Star 
} from "lucide-react";
import { motion } from "framer-motion";
import TestimonialsSection from '../components/TestimonialsSection';

const HomePage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      }
    }
  };

  const features = [
    {
      icon: <Building2 className="h-12 w-12 text-[#6366F1] mx-auto mb-4" />,
      title: "Company-Based Search",
      description: "Find accommodations near your workplace or where your colleagues stay"
    },
    {
      icon: <Shield className="h-12 w-12 text-[#6366F1] mx-auto mb-4" />,
      title: "Verified Listings",
      description: "All accommodations are verified for safety and reliability"
    },
    {
      icon: <Users className="h-12 w-12 text-[#6366F1] mx-auto mb-4" />,
      title: "Connect with Peers",
      description: "Find roommates from your company or institution"
    }
  ];

  const howItWorks = [
    {
      icon: <Search className="h-12 w-12 text-[#6366F1] mx-auto mb-4" />,
      title: "Search",
      description: "Find PGs and hostels filtered by company location or peer residency"
    },
    {
      icon: <Star className="h-12 w-12 text-[#6366F1] mx-auto mb-4" />,
      title: "Choose",
      description: "Compare amenities, prices, and read verified reviews"
    },
    {
      icon: <MessageSquare className="h-12 w-12 text-[#6366F1] mx-auto mb-4" />,
      title: "Connect",
      description: "Message property owners or potential roommates directly"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-900 text-white py-20"
      >
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center mb-6"
          >
            Find Your Home Near Your Workplace
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-center text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Connect with peers from your company and discover verified PGs, hostels, and 
            apartments that make your transition to a new city seamless
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button 
              size="lg"
              className="bg-[#6366F1] hover:bg-[#4F46E5]"
              onClick={() => navigate('/accommodations')}
            >
              <Search className="h-4 w-4 mr-2" />
              Find Accommodation
            </Button>
            <Button 
              size="lg"
              className="bg-white text-slate-900 hover:bg-gray-100"
              onClick={() => navigate('/post-accommodation')}
            >
              <Building2 className="h-4 w-4 mr-2" />
              List Your Property
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="bg-white py-16"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold mb-4 text-center"
          >
            Why Choose Shelter Finder?
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          >
            We make it easy for newcomers to find reliable accommodation near their workplace 
            and connect with peers from their organization
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="bg-gray-50 py-16"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold mb-4 text-center"
          >
            How It Works
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          >
            Find and book your ideal accommodation in three simple steps
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 bg-white rounded-lg shadow-lg"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                {step.icon}
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <TestimonialsSection />

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#6366F1] text-white py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Ready to Find Your Perfect Stay?
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg mb-8 max-w-2xl mx-auto"
          >
            Join thousands of professionals who've found their ideal accommodation through Shelter Finder
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button 
              size="lg"
              className="bg-white text-[#6366F1] hover:bg-gray-100"
              onClick={() => navigate('/accommodations')}
            >
              Get Started Now
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;