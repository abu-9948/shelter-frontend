import React from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Search, Building2, MessageSquare, Star } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-6">
            Find Your Perfect Accommodation
          </h1>
          <p className="text-lg text-center text-gray-300 mb-8">
            Discover PGs, Hostels, and Apartments near your workplace
          </p>
          
          {/* Search Box */}
          <div className="max-w-2xl mx-auto flex gap-2">
            <Input 
              placeholder="Enter location or company name..."
              className="bg-white text-black"
            />
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Popular Accommodations */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Popular Accommodations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularAccommodations.map((acc, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{acc.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 mb-4 rounded-lg"></div>
                <p className="text-gray-600 mb-2">{acc.location}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">₹{acc.price}/month</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                    <span>{acc.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardContent className="pt-6">
                <Search className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-center mb-2">Search</h3>
                <p className="text-gray-600 text-center">
                  Find accommodations near your workplace or desired location
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="pt-6">
                <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-center mb-2">Compare</h3>
                <p className="text-gray-600 text-center">
                  Compare prices, amenities, and read reviews from other users
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="pt-6">
                <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-center mb-2">Connect</h3>
                <p className="text-gray-600 text-center">
                  Message property owners directly and schedule visits
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Post Accommodation CTA */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Are You a Property Owner?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          List your property on our platform and connect with thousands of potential tenants looking for accommodations.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Post Your Accommodation
        </Button>
      </div>
    </div>
  );
};

// Sample data for popular accommodations
const popularAccommodations = [
  {
    name: "Sunshine PG",
    location: "Whitefield, Bangalore",
    price: "8,000",
    rating: "4.5",
  },
  {
    name: "Tech Valley Hostel",
    location: "Electronic City, Bangalore",
    price: "7,500",
    rating: "4.3",
  },
  {
    name: "Green View Apartments",
    location: "HSR Layout, Bangalore",
    price: "12,000",
    rating: "4.7",
  },
];

export default HomePage;