import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Star, MapPin, Building2, IndianRupee } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const AccommodationCard = ({ accommodation }) => {
    const navigate = useNavigate();

    return (
        <Card
            className="hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200"
            onClick={() => navigate(`/accommodations/${accommodation._id}`)}
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium truncate">
                    {accommodation.name}
                </CardTitle>
                <div className="flex items-center px-2 py-1 bg-yellow-50 rounded-full">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                    <span className="text-yellow-700">{accommodation.rating}</span>
                </div>
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
    );
};

export default AccommodationCard;