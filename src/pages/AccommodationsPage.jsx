import React, { useState, useEffect } from 'react';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, MapPin, Building2, FilterX, Filter, Users } from "lucide-react";
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import Loader from '../components/Loader';
import AccommodationCard from '../components/AccommodationCard';

const AccommodationsPage = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFiltering, setIsFiltering] = useState(false);
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        companyName: ''
    });

    useEffect(() => {
        fetchAccommodations();
    }, []);

    const fetchAccommodations = async (withFilters = false) => {
        setIsLoading(true);
        try {
            let url = `${process.env.REACT_APP_ACCOMMODATION}/search?`;
            const queryParams = new URLSearchParams();

            if (withFilters) {
                if (filters.search) queryParams.append('name', filters.search);
                if (filters.location) queryParams.append('location', filters.location);
                if (filters.companyName) queryParams.append('companyName', filters.companyName);
            }

            const response = await axios.get(
                queryParams.toString() ? `${url}${queryParams}` : `${process.env.REACT_APP_ACCOMMODATION}/get`
            );

            setAccommodations(response.data);
            if (withFilters) {
                toast.success('Filters applied successfully');
            }
        } catch (error) {
            if (error.response?.status === 404) {
                setAccommodations([]);
            } else {
                toast.error('Failed to fetch accommodations');
            }
        } finally {
            setIsLoading(false);
            setIsFiltering(false);
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
        fetchAccommodations();
    };

    const applyFilters = () => {
        setIsFiltering(true);
        fetchAccommodations(true);
    };

    const NoAccommodationsFound = () => (
        <div className="col-span-full flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <Search className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-gray-500 text-center">
                No accommodations found<br />
                <span className="text-sm">Try adjusting your filters</span>
            </p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                name="search"
                                placeholder="Search accommodations..."
                                value={filters.search}
                                onChange={handleFilterChange}
                                className="pl-10"
                            />
                        </div>
                        <div className="relative flex-1 min-w-[200px]">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                name="location"
                                placeholder="Location"
                                value={filters.location}
                                onChange={handleFilterChange}
                                className="pl-10"
                            />
                        </div>
                        <div className="relative flex-1 min-w-[200px]">
                            <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                name="companyName"
                                placeholder="Company"
                                value={filters.companyName}
                                onChange={handleFilterChange}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            {(filters.search || filters.location || filters.companyName) && (
                                <Button
                                    variant="outline"
                                    onClick={clearFilters}
                                    className="whitespace-nowrap"
                                    disabled={isFiltering}
                                >
                                    <FilterX className="h-4 w-4 mr-2" />
                                    Clear
                                </Button>
                            )}
                            <Button
                                onClick={applyFilters}
                                className="bg-[#6366F1] hover:bg-[#5558D9] text-white whitespace-nowrap"
                                disabled={isFiltering}
                            >
                                <Filter className="h-4 w-4 mr-2" />
                                {isFiltering ? 'Applying...' : 'Apply'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Users className="h-4 w-4" />
                                <span>{accommodations.length} accommodations found</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {accommodations.length > 0 ? (
                                accommodations.map((accommodation) => (
                                    <AccommodationCard 
                                        key={accommodation._id} 
                                        accommodation={accommodation} 
                                    />
                                ))
                            ) : (
                                <NoAccommodationsFound />
                            )}
                        </div>
                    </>
                )}
            </div>
            <Toaster position="top-center" />
        </div>
    );
};

export default AccommodationsPage;