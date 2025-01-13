import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Users, Building, Search, User, Menu, AlertCircle, Mail, Lock, MapPin, IndianRupee, Star, Phone, List, FileText, Code, Settings, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { Alert, AlertDescription } from "../components/ui/alert";


const DocSideNav = ({ activeSection, setActiveSection, isMobile = false }) => {
  const [expandedSections, setExpandedSections] = useState({
    getStarted: true,
    userFlow: true,
    ownerFlow: true,
    seekerFlow: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: "getStarted",
      title: "Get Started",
      icon: Settings,
      items: [
        { id: "introduction", title: "Introduction" }
      ]
    },
    {
      id: "userFlow",
      title: "User Flow",
      icon: User,
      items: [
        { id: "signUp", title: "Sign Up Process" },
        { id: "signIn", title: "Sign In Process" },
        { id: "passwordReset", title: "Password Reset" }
      ]
    },
    {
      id: "ownerFlow",
      title: "Owner Flow",
      icon: Building,
      items: [
        { id: "postAccommodation", title: "Post Accommodation" }
      ]
    },
    {
      id: "seekerFlow",
      title: "Seeker Flow",
      icon: Search,
      items: [
        { id: "searchAccommodation", title: "Search Accommodation" }
      ]
    }
  ];

  const NavSection = ({ id, title, icon: Icon, items }) => (
    <div className="mb-4">
      <button
        onClick={() => toggleSection(id)}
        className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded-lg"
      >
        <Icon className="h-5 w-5" />
        <span className="font-medium">{title}</span>
        {expandedSections[id] ? (
          <ChevronDown className="h-4 w-4 ml-auto" />
        ) : (
          <ChevronRight className="h-4 w-4 ml-auto" />
        )}
      </button>
      {expandedSections[id] && (
        <div className="ml-7 space-y-1 mt-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full text-left p-2 text-sm rounded-lg ${
                activeSection === item.id
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-2">
        {sections.map((section) => (
          <NavSection key={section.id} {...section} />
        ))}
      </div>
    </ScrollArea>
  );
};

const AlertSection = ({header}) => (
  <div className="flex justify-between items-center">
    <h1 className="text-3xl font-bold">{header}</h1>
    <Alert className="bg-amber-50 border border-amber-200 rounded-lg flex items-center p-4 w-auto">
      <div className="flex items-center gap-3">
        <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
        <AlertDescription className="text-amber-800 text-sm font-medium">
          Fields marked with * are required
        </AlertDescription>
      </div>
    </Alert>
  </div>
);

const IntroductionSection = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Documentation Welcome</h1>
    
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Getting Started</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {/* Quick Start */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Quick Start Guide</h3>
            {/* <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Installation</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-sm text-gray-500">How to install the package</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Basic Usage</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-sm text-gray-500">Simple example code</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Configuration</span>
                </div>
                <span className="text-sm text-gray-500">Initial setup options</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Support</span>
                </div>
                <span className="text-sm text-gray-500">Getting help resources</span>
              </div>
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const SignUpSection = () => (
  <div className="space-y-6">
    <AlertSection header="Sign Up Process" />
    
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Registration Requirements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Basic Information</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Name</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-sm text-gray-500">Your full name</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Email</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-sm text-gray-500">Valid email for verification</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Password</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-sm text-gray-500">Minimum 6 characters</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Role</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-sm text-gray-500">Room Seeker or Owner</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Additional Options</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                Google Sign Up available
              </li>
              {/* <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                Email verification required after registration
              </li> */}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const SignInSection = () => (
  <div className="space-y-6">
    <AlertSection header="Sign In Process"/>

    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Login Requirements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Basic Information</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Email</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-sm text-gray-500">Your registered email</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Password</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-sm text-gray-500">Minimum 6 characters</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Additional Options</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                Google Sign In available
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                Forgot Password recovery option
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const PasswordResetSection = () => (
  <div className="space-y-6">
    <AlertSection header="Password Reset Process" />
    
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Reset Requirements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {/* Step 1: Request Reset */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Step 1: Request Reset</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Email</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-sm text-gray-500">Your registered email</span>
              </div>
            </div>
          </div>

          {/* Step 2: New Password */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Step 2: New Password</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">New Password</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-sm text-gray-500">Minimum 6 characters</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Confirm Password</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-sm text-gray-500">Must match new password</span>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Important Information</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                Reset link will be sent to your email
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                Link expires in 1 hour for security
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                Check spam folder if email not received
              </li>
            </ul>
          </div>

          {/* Process Flow */}
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-900 mb-2">Reset Process</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-1.5 text-green-800 text-sm mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-800">Request Reset</h4>
                  <p className="text-sm text-green-700">Enter your registered email</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-1.5 text-green-800 text-sm mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-800">Check Email</h4>
                  <p className="text-sm text-green-700">Click the reset link in your email</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-1.5 text-green-800 text-sm mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-800">Set New Password</h4>
                  <p className="text-sm text-green-700">Enter and confirm your new password</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const PostAccommodationSection = () => (
  <div className="space-y-6">
    <AlertSection header="Post Accommodation" />
    
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Required Property Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {/* Basic Details */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Basic Details</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Property Name</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-sm text-gray-500">Unique name for your property</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Location</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-sm text-gray-500">Full address with city</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Monthly Rent</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-sm text-gray-500">Base rent amount</span>
              </div>
            </div>
          </div>
          
          {/* Additional Information */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Additional Information</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Company Name</span>
                </div>
                <span className="text-sm text-gray-500">Associated company (if any)</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Phone Number</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-sm text-gray-500">Contact number</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Available Spaces</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-sm text-gray-500">Number of rooms/beds</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Flat Number</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-sm text-gray-500">Unique identifier</span>
              </div>
            </div>
          </div>
          
          {/* Description & Amenities */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Description & Amenities</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Full Address</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-sm text-gray-500">Complete property address</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <List className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Amenities</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-sm text-gray-500">Available facilities</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <List className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Description</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-sm text-gray-500">Property details</span>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          {/* <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Important Notes</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                At least 3 property photos are required
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                All amenities must be accurately listed
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                Contact information must be current
              </li>
            </ul>
          </div> */}
        </div>
      </CardContent>
    </Card>
  </div>
);

const SearchAccommodationSection = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Search & Filter Options</h1>
    
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Search & Filter Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {/* Search Parameters */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Search Parameters</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Search by Name</span>
                </div>
                <span className="text-sm text-gray-500">Property or building name</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Search by Location</span>
                </div>
                <span className="text-sm text-gray-500">Area, city, or landmark</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Search by Company</span>
                </div>
                <span className="text-sm text-gray-500">Nearby company/workplace</span>
              </div>
            </div>
          </div>

          {/* Filter Options */}
          {/* <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Filter Options</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Price Range</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center gap-2">
                    <IndianRupee className="h-3 w-3" />
                    Set minimum budget
                  </li>
                  <li className="flex items-center gap-2">
                    <IndianRupee className="h-3 w-3" />
                    Set maximum budget
                  </li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Property Type</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center gap-2">
                    <Building className="h-3 w-3" />
                    PG/Hostel/Apartment
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    Single/Sharing options
                  </li>
                </ul>
              </div>
            </div>
          </div> */}

          {/* Reviews & Ratings */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Reviews & Ratings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">View Reviews</span>
                </div>
                <span className="text-sm text-gray-500">Read tenant experiences</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Post Reviews</span>
                </div>
                <span className="text-sm text-gray-500">Share your experience</span>
              </div>
            </div>
          </div>

          {/* Search Tips */}
          {/* <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Search Tips</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                Use filters to narrow down options
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                Check property ratings and reviews
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                Compare multiple properties
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                Save favorites for later viewing
              </li>
            </ul>
          </div> */}
        </div>
      </CardContent>
    </Card>
  </div>
);

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const getContent = () => {
    switch (activeSection) {
      case "signUp":
        return <SignUpSection />;
      case "signIn":
        return <SignInSection />;
      case "passwordReset":
        return <PasswordResetSection />;
      case "postAccommodation":
        return <PostAccommodationSection />;
      case "searchAccommodation":
        return <SearchAccommodationSection />;
      default:
        return <IntroductionSection />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex h-screen">
        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="px-2 py-2">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle>Documentation</SheetTitle>
              </SheetHeader>
              <DocSideNav
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                isMobile={true}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block w-72 border-r">
          <DocSideNav
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-8">
            {getContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;