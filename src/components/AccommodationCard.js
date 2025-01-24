/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPin, Building2, IndianRupee, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import AccommodationPlaceholder from './AccommodationPlaceholder';

const AccommodationCard = ({ accommodation, userId, isFavorite = false, onToggleFavorite }) => {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [currentFavorite, setCurrentFavorite] = useState(isFavorite);
    const [isHovered, setIsHovered] = useState(false);
    const hasMultipleImages = accommodation.images && accommodation.images.length > 1;

    useEffect(() => {
        setCurrentFavorite(isFavorite);
    }, [isFavorite]);

    useEffect(() => {
        if (!hasMultipleImages) return;

        const interval = setInterval(() => {
            setCurrentImageIndex(current =>
                current === accommodation.images.length - 1 ? 0 : current + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [hasMultipleImages, accommodation.images]);

    const handlePrevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex(current =>
            current === 0 ? accommodation.images.length - 1 : current - 1
        );
    };

    const handleNextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex(current =>
            current === accommodation.images.length - 1 ? 0 : current + 1
        );
    };

    const handleFavoriteClick = async (e) => {
        e.stopPropagation();
        if (!userId || isLoading) return;

        setIsLoading(true);
        try {
            await onToggleFavorite(accommodation._id, !currentFavorite);
            setCurrentFavorite(!currentFavorite);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <TooltipProvider>
            <Card
                className="hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 group"
                onClick={() => navigate(`/accommodations/${accommodation._id}`)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative w-full h-48">
                    {accommodation.images && accommodation.images.length > 0 ? (
                        <>
                            <img
                                src={accommodation.images[currentImageIndex]}
                                alt={`${accommodation.name} - Image ${currentImageIndex + 1}`}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            {hasMultipleImages && (
                                <>
                                    <button
                                        onClick={handlePrevImage}
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-1 rounded-full text-white hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-1 rounded-full text-white hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </button>

                                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                                        {accommodation.images.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`h-1.5 w-1.5 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <AccommodationPlaceholder />
                    )}

                    {/* Favorite Button - Show on hover or if already favorited */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={handleFavoriteClick}
                                disabled={isLoading || !userId}
                                className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300
                                    ${currentFavorite
                                        ? 'bg-red-500 text-white hover:bg-red-600'
                                        : 'bg-black/50 text-white hover:bg-black/70'} 
                                    ${(isHovered || currentFavorite) ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <Heart
                                    className={`h-5 w-5 ${currentFavorite ? 'fill-current' : ''}`}
                                />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            {!userId
                                ? 'Login to add to favorites'
                                : currentFavorite
                                    ? 'Remove from favorites'
                                    : 'Add to favorites'
                            }
                        </TooltipContent>
                    </Tooltip>
                </div>

                {/* Rest of the card content remains the same */}
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-medium truncate">
                        {accommodation.name}
                    </CardTitle>
                    {/* <div className="flex items-center px-2 py-1 bg-yellow-50 rounded-full">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                    </div> */}
                </CardHeader>

                <CardContent>
                    <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="mr-2 h-4 w-4" />
                            <span className="truncate">{accommodation.location}</span>
                        </div>
                        {accommodation.companyName && (
                            <div className="flex items-center text-sm text-gray-500">
                                <Building2 className="mr-2 h-4 w-4" />
                                <span className="truncate">{accommodation.companyName}</span>
                            </div>
                        )}
                        <div className="flex items-center text-sm font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-full w-fit">
                            <IndianRupee className="mr-1 h-4 w-4" />
                            {accommodation.price}/month
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                            {accommodation.description}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </TooltipProvider>
    );
};

export default AccommodationCard;