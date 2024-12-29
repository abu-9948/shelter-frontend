import React from 'react';
import { Button } from "../components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Search, Building2, MessageSquare } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-6">
            Find Your Perfect Accommodation
          </h1>
          <p className="text-lg text-center text-gray-300 mb-8">
            Discover PGs, Hostels, and Apartments near your workplace
          </p>
          
          <div className="flex justify-center gap-4">
            <Button 
              className="bg-lime-600 hover:bg-lime-700"
              onClick={() => navigate('/accommodations')}
            >
              <Search className="h-4 w-4 mr-2" />
              Browse Accommodations
            </Button>
            <Button 
              className="bg-white text-slate-900 hover:bg-gray-100"
              onClick={() => navigate('/post-accommodation')}
            >
              List Your Property
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Search className="h-12 w-12 text-lime-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Search</h3>
              <p className="text-gray-600">
                Find accommodations near your workplace
              </p>
            </div>
            <div className="text-center">
              <Building2 className="h-12 w-12 text-lime-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Compare</h3>
              <p className="text-gray-600">
                Compare prices and amenities
              </p>
            </div>
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-lime-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Contact property owners directly
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;