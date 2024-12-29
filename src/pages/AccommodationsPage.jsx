import React, { useState, useEffect } from 'react';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Search, MapPin, Building2, Star, Loader2, DollarSign } from "lucide-react";
// import { useDebounce } from '../hooks/useDebounce';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const AccommodationsPage = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        companyName: ''
    });

    // const debouncedFilters = {
    //     search: useDebounce(filters.search, 500),
    //     location: useDebounce(filters.location, 500),
    //     companyName: useDebounce(filters.companyName, 500)
    // };
    
    const navigate = useNavigate();


    useEffect(() => {
        fetchAccommodations();
    }, []);

    const fetchAccommodations = async () => {
        setIsLoading(true);
        try {
            let url = `${process.env.REACT_APP_ACCOMMODATION}/search?`;
            const queryParams = new URLSearchParams();

            // if (debouncedFilters.search) {
            //     queryParams.append('name', debouncedFilters.search);
            // }
            // if (debouncedFilters.location) {
            //     queryParams.append('location', debouncedFilters.location);
            // }
            // if (debouncedFilters.companyName) {
            //     queryParams.append('companyName', debouncedFilters.companyName);
            // }

            const response = await axios.get(
                queryParams.toString() ? `${url}${queryParams}` : `${process.env.REACT_APP_ACCOMMODATION}/get`
            );

            setAccommodations(response.data);
        } catch (error) {
            if (error.response?.status === 404) {
                setAccommodations([]);
            } else {
                toast.error('Failed to fetch accommodations');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            location: '',
            companyName: ''
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                name="search"
                                placeholder="Search accommodations..."
                                value={filters.search}
                                onChange={handleFilterChange}
                                className="pl-10"
                            />
                        </div>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                name="location"
                                placeholder="Filter by location..."
                                value={filters.location}
                                onChange={handleFilterChange}
                                className="pl-10"
                            />
                        </div>
                        
                        <div className="relative">
                            <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                name="companyName"
                                placeholder="Filter by company..."
                                value={filters.companyName}
                                onChange={handleFilterChange}
                                className="pl-10"
                            />
                        </div>
                    </div>
                    {(filters.search || filters.location || filters.companyName) && (
                        <Button
                            variant="outline"
                            onClick={clearFilters}
                            className="text-sm"
                        >
                            Clear Filters
                        </Button>
                    )}
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-lime-600" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {accommodations.map((accommodation) => (
                            <Card 
                            key={accommodation._id}
                            className="hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => navigate(`/accommodations/${accommodation._id}`)}
                            >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xl font-medium truncate">
                                        {accommodation.name}
                                    </CardTitle>
                                    <div className="flex items-center">
                                        <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                                        <span>{accommodation.rating}</span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <MapPin className="mr-2 h-4 w-4" />
                                            <span className="truncate">{accommodation.location}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Building2 className="mr-2 h-4 w-4" />
                                            <span className="truncate">{accommodation.companyName}</span>
                                        </div>
                                        <div className="flex items-center text-sm font-semibold">
                                            <DollarSign className="mr-2 h-4 w-4" />
                                            ₹{accommodation.price}/month
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {accommodation.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {accommodations.length === 0 && !isLoading && (
                            <div className="col-span-full flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                <p className="text-gray-500">No accommodations found</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Toaster position="top-center" />
        </div>
    );
};

export default AccommodationsPage;