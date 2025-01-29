/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import Loader from '../components/Loader';
import AccommodationCard from '../components/AccommodationCard';
import FilterSidebar from '../components/FilterSidebar';
import PaginatedAccommodations from '../components/PaginatedAccommodations';
import { useAuth } from '../contexts/AuthContext';
import { FilterX, Search } from 'lucide-react';
import { Button } from '../components/ui/button';

const AccommodationsPage = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [filteredAccommodations, setFilteredAccommodations] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        companyName: '',
        minPrice: null,
        maxPrice: null,
        rating: 0,
        showFavorites: false,
        sortPrice: null,
        occupancyType: '',
        roomType: '',
    });
    const [tempInputs, setTempInputs] = useState({
        search: '',
        companyName: '',
    });
    const { userId } = useAuth();

    useEffect(() => {
        fetchAccommodations();
        if (userId) {
            fetchUserFavorites();
        }
    }, [userId]);

    console.log(filteredAccommodations)

    useEffect(() => {
        if (!isInputValueChanged()) {
            applyFilters();
        }
    }, [filters.location, filters.sortPrice, filters.maxPrice, filters.maxPrice, filters.rating, filters.showFavorites, accommodations, favorites, filters.occupancyType, filters.roomType]);

    const isInputValueChanged = () => {
        return filters.search !== tempInputs.search ||
               filters.companyName !== tempInputs.companyName
    };

    const fetchUserFavorites = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_ACCOMMODATION}/favs/${userId}`);
            setFavorites(response.data);
        } catch (error) {
            console.error('Failed to fetch favorites');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAccommodations = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_ACCOMMODATION}/get`);
            const availableAccommodations = [...response.data]
                .filter(acc => acc.available === true)
                .reverse();
            
            setAccommodations(availableAccommodations);
            setFilteredAccommodations(availableAccommodations);
        } catch (error) {
            toast.error('Failed to fetch accommodations');
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempInputs(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const clearFilters = () => {
        const clearedFilters = {
            search: '',
            location: '',
            companyName: '',
            minPrice: null,
            maxPrice: null,
            rating: 0,
            showFavorites: false,
            sortPrice: null, 
            occupancyType: '',
            roomType: '',
        };
        setFilters(clearedFilters);
        setTempInputs({
            search: '',
            companyName: '',
            minPrice: null,
            maxPrice: null
        });
        setFilteredAccommodations(accommodations);
    };

    const applyFilters = () => {
        let filtered = [...accommodations];

        if (filters.search) {
            filtered = filtered.filter(acc => 
                acc.name?.toLowerCase().includes(filters.search?.toLowerCase())
            );
        }
        if (filters.location) {
            filtered = filtered.filter(acc => 
                acc.location?.toLowerCase().includes(filters.location?.toLowerCase())
            );
        }
        if (filters.companyName) {
            filtered = filtered.filter(acc => 
                acc.companyName?.toLowerCase().includes(filters.companyName?.toLowerCase())
            );
        }
        if (filters.occupancyType) {
            filtered = filtered.filter(acc => 
                acc.occupancyType === filters.occupancyType
            );
        }
        if (filters.roomType) {
            filtered = filtered.filter(acc => 
                acc.roomType === filters.roomType
            );
        }
        if (filters.minPrice !== null) {
            filtered = filtered.filter(acc => acc.price >= filters.minPrice);
        }
        if (filters.maxPrice !== null) {
            filtered = filtered.filter(acc => acc.price <= filters.maxPrice);
        }
        if (filters.rating > 0) {
            filtered = filtered.filter(acc => acc.rating >= filters.rating);
        }
        if (filters.showFavorites) {
            filtered = filtered.filter(acc => 
                favorites.some(fav => fav._id === acc._id)
            );
        }
        if (filters.sortPrice) {
            filtered.sort((a, b) => {
                if (filters.sortPrice === 'desc') {
                    return b.price - a.price;
                } else if (filters.sortPrice === 'asc') {
                    return a.price - b.price;
                }
                return 0;
            });
        }

        setFilteredAccommodations(filtered);
    };

    const applyAllFilters = () => {
        setIsLoading(true);
        setFilters(prev => ({
            ...prev,
            search: tempInputs.search,
            companyName: tempInputs.companyName,
            minPrice: tempInputs.minPrice,
            maxPrice: tempInputs.maxPrice
        }));
        
        let filtered = [...accommodations];
    
        if (tempInputs.search) {
            filtered = filtered.filter(acc => 
                acc.name?.toLowerCase().includes(tempInputs.search?.toLowerCase())
            );
        }
        if (filters.location) {
            filtered = filtered.filter(acc => 
                acc.location?.toLowerCase().includes(filters.location?.toLowerCase())
            );
        }
        if (tempInputs.companyName) {
            filtered = filtered.filter(acc => 
                acc.companyName?.toLowerCase().includes(tempInputs.companyName?.toLowerCase())
            );
        }
        if (filters.occupancyType) {
            filtered = filtered.filter(acc => 
                acc.occupancyType === filters.occupancyType
            );
        }
        if (filters.roomType) {
            filtered = filtered.filter(acc => 
                acc.roomType === filters.roomType
            );
        }
        if (tempInputs.minPrice !== null) {
            filtered = filtered.filter(acc => acc.price >= tempInputs.minPrice);
        }
        if (tempInputs.maxPrice !== null) {
            filtered = filtered.filter(acc => acc.price <= tempInputs.maxPrice);
        }
        if (filters.rating > 0) {
            filtered = filtered.filter(acc => acc.rating >= filters.rating);
        }
        if (filters.showFavorites) {
            filtered = filtered.filter(acc => 
                favorites.some(fav => fav._id === acc._id)
            );
        }

        if (filters.sortPrice) {
            filtered.sort((a, b) => {
                if (filters.sortPrice === 'desc') {
                    return b.price - a.price;
                } else if (filters.sortPrice === 'asc') {
                    return a.price - b.price;
                }
                return 0;
            });
        }
    
        setFilteredAccommodations(filtered);
        setIsLoading(false);
    };

    const handleToggleFavorite = async (accommodationId, newFavoriteState) => {
        if (!userId) {
            toast.error('Please login to add favorites');
            return;
        }

        try {
            if (newFavoriteState) {
                await axios.post(`${process.env.REACT_APP_ACCOMMODATION}/favs/add/${userId}`, 
                    {accommodationId}
                );
                setFavorites(prev => [...prev, {_id: accommodationId}]);
                toast.success('Added to favorites');
            } else {
                await axios.delete(`${process.env.REACT_APP_ACCOMMODATION}/favs/remove/${userId}`, 
                    { data: { accommodationId } }
                );
                setFavorites(prev => prev.filter(fav => fav._id !== accommodationId));
                toast.success('Removed from favorites');
            }
        } catch (error) {
            toast.error('Failed to update favorites');
            console.error('Error:', error);
        }
    };

    const NoAccommodationsFound = () => (
        <div className="col-span-full flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <Search className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-gray-500 text-center mb-4">
                No accommodations found<br />
                <span className="text-sm">Try adjusting your filters</span>
            </p>
            <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="flex items-center gap-2"
            >
                <FilterX className="h-4 w-4" />
                Clear Filters
            </Button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8 flex gap-8 relative">
                    <div className="hidden lg:block h-screen sticky top-24">
                        <FilterSidebar
                            filters={filters}
                            tempInputs={tempInputs}
                            setFilters={setFilters}
                            accommodations={accommodations}
                            onFilterChange={handleFilterChange}
                            onInputChange={handleInputChange}
                            onApplyFilters={applyAllFilters}
                            onClearFilters={clearFilters}
                            showMobileFilters={showMobileFilters}
                            setShowMobileFilters={setShowMobileFilters}
                            isLoading={isLoading}
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <PaginatedAccommodations
                                accommodations={filteredAccommodations || []}
                                userId={userId}
                                favorites={favorites}
                                onToggleFavorite={handleToggleFavorite}
                                AccommodationCard={AccommodationCard}
                                NoAccommodationsFound={NoAccommodationsFound}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Toaster position="top-center" />
        </div>
    );
};

export default AccommodationsPage;