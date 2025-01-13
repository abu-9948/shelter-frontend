import React from 'react';
import { Card, CardContent } from "../components/ui/card";
import {
  Home,
  Server,
  Database,
  Code,
  Crown,
  Target,
  Shield,
  HeartHandshake,
  Users,
  Award
} from 'lucide-react';

const AboutPage = () => {
  const mentor = [
    {
      name: "Mahanthi Gangadhar",
      role: "Project Guide & Mentor",
      icon: <Crown className="h-8 w-8 text-[#6366F1]" />,
      description: "Project Head & Technical Guide"
    },
    {
      name: "Surya Prasad",
      role: "Project Sponsor",
      icon: <Award className="h-8 w-8 text-[#6366F1]" />,
      description: "Providing strategic guidance and support"
    }
  ];

  const team = [
    {
      name: "Abu",
      role: "Backend Developer",
      icon: <Server className="h-6 w-6 text-[#6366F1]" />,
      description: "Backend API development and database architecture."
    },
    {
      name: "Sravya",
      role: "Backend Developer",
      icon: <Server className="h-6 w-6 text-[#6366F1]" />,
      description: "API integration and server-side logic."
    },
    {
      name: "Arun Kumar",
      role: "Database Developer",
      icon: <Database className="h-6 w-6 text-[#6366F1]" />,
      description: "Database design and optimization."
    },
    {
      name: "Haresh Routhu",
      role: "Database Developer",
      icon: <Database className="h-6 w-6 text-[#6366F1]" />,
      description: "Database management and data modeling."
    },
    {
      name: "Satish",
      role: "Frontend Developer",
      icon: <Code className="h-6 w-6 text-[#6366F1]" />,
      description: "Building the user interface and frontend functionality."
    },
    {
      name: "Aparna",
      role: "Frontend Developer",
      icon: <Code className="h-6 w-6 text-[#6366F1]" />,
      description: "Handles frontend development and user experience design."
    }
  ];

  const features = [
    {
      icon: <Users className="h-6 w-6 text-[#6366F1]" />,
      title: "For Room Seekers",
      points: [
        "Search rooms near your company",
        "Filter by your budget",
        "Message room owners",
        "Read/Post reviews"
      ]
    },
    {
      icon: <Home className="h-6 w-6 text-[#6366F1]" />,
      title: "For Room Owners",
      points: [
        "Post room details",
        "Add room pictures",
        "Set room price",
        "Update room availability"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Shelter Finder
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Helping students and professionals find their ideal accommodations in new cities,
            making relocation easier and more comfortable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-[#EEF2FF] rounded-lg mb-4">
                <Target className="h-6 w-6 text-[#6366F1]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-600">
                To simplify the accommodation search process for newcomers in unfamiliar cities,
                connecting them with reliable housing options.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-[#EEF2FF] rounded-lg mb-4">
                <Shield className="h-6 w-6 text-[#6366F1]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Values</h3>
              <p className="text-gray-600">
                We prioritize trust, safety, and community, ensuring all listings are verified
                and users can make informed decisions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-[#EEF2FF] rounded-lg mb-4">
                <HeartHandshake className="h-6 w-6 text-[#6366F1]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
              <p className="text-gray-600">
                To become the go-to platform for newcomers seeking accommodations,
                making the transition to a new city seamless.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mentor.map((mentor, index) => (
              <Card key={index} className="border-2 border-[#6366F1] shadow-xl bg-gradient-to-r from-[#EEF2FF] to-[#F5F3FF]">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-16 h-16 bg-[#EEF2FF] rounded-full">
                      {mentor.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{mentor.name}</h3>
                      <p className="text-[#6366F1] font-semibold">{mentor.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg font-medium">{mentor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-none shadow-lg hover:border-[#6366F1] hover:border transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#EEF2FF] rounded-lg mb-4">
                    {member.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-[#6366F1] mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg hover:border-[#6366F1] hover:border transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-[#EEF2FF] rounded-lg">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {feature.points.map((point, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#6366F1] rounded-full" />
                        <span className="text-gray-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="border-none shadow-lg">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              Have questions about Shelter Finder? We're here to help!
            </p>
            <a
              href="mailto:contact@shelterfinder.com"
              className="inline-block px-6 py-2 bg-[#6366F1] text-white rounded-lg hover:bg-[#4F46E5] transition-colors"
            >
              Contact Us
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;