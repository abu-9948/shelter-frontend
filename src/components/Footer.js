import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center justify-start">
                            <img
                                src="/favicon.svg"
                                alt="Google"
                                className="h-14"
                            />
                            <h1 className="text-lg font-semibold text-[#6366F1]">Shelter Finder</h1>
                        </Link>
                        <p className="mt-2 text-sm text-gray-500">
                            Find your perfect accommodation with ease. We connect students and professionals
                            with quality housing options.
                        </p>

                        <div className="mt-4 pt-4 border-t text-sm text-start text-gray-500">
                            <p>© {new Date().getFullYear()} Shelter Finder. All rights reserved.</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link to="/" className="hover:text-[#6366F1]">Home</Link></li>
                            <li><Link to="/about" className="hover:text-[#6366F1]">About Us</Link></li>
                            <li><Link to="/accommodations" className="hover:text-[#6366F1]">Find Accommodation</Link></li>
                            <li><Link to="/post-accommodation" className="hover:text-[#6366F1]">List Property</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium mb-4">Connect With Us</h3>
                        <div className="flex space-x-4 mb-4">
                            <a href="/home" className="text-gray-400 hover:text-[#6366F1]">
                                <Facebook size={20} />
                            </a>
                            <a href="/home" className="text-gray-400 hover:text-[#6366F1]">
                                <Twitter size={20} />
                            </a>
                            <a href="/home" className="text-gray-400 hover:text-[#6366F1]">
                                <Instagram size={20} />
                            </a>
                            <a href="mailto:contact@shelterfinder.com" className="text-gray-400 hover:text-[#6366F1]">
                                <Mail size={20} />
                            </a>
                        </div>
                        {/* <p className="text-sm text-gray-500"><s>contact@shelterfinder.com</s></p> */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;