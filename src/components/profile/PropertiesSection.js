import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Home, Heart } from 'lucide-react';
import AccommodationList from '../AccommodationList';

const PropertiesSection = ({
  accommodations,
  favorites,
  isLoading,
  userId,
  onToggleFavorite
}) => {
  const navigate = useNavigate();

  const handleAccommodationClick = (accommodationId) => {
    navigate(`/accommodations/${accommodationId}`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-medium">Your Properties</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="accommodations" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="accommodations" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Your Listings ({accommodations.length})
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites ({favorites.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accommodations" className="mt-4">
            <div className="space-y-4">
              {accommodations.length > 0 && (
                <div className="flex justify-end">
                  <Button
                    variant="default"
                    onClick={() => navigate('/manage-accommodations')}
                    className="bg-[#6366F1] hover:bg-[#4F46E5]"
                  >
                    Manage All Listings
                  </Button>
                </div>
              )}
              <AccommodationList
                accommodations={accommodations}
                isLoading={isLoading}
                showActions={false}
                gridCols="grid-cols-1 gap-4"
                onAccommodationClick={handleAccommodationClick}
              />
              {accommodations.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">You haven't listed any properties yet.</p>
                  <Button
                    variant="default"
                    onClick={() => navigate('/add-accommodation')}
                    className="mt-4 bg-[#6366F1] hover:bg-[#4F46E5]"
                  >
                    Add Your First Property
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-4">
            <AccommodationList
              accommodations={favorites}
              isLoading={isLoading}
              showActions={false}
              gridCols="grid-cols-1 gap-4"
              userId={userId}
              onToggleFavorite={onToggleFavorite}
              showFavorites={true}
              onAccommodationClick={handleAccommodationClick}
            />
            {favorites.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">You haven't saved any properties to your favorites yet.</p>
                <Button
                  variant="default"
                  onClick={() => navigate('/')}
                  className="mt-4 bg-[#6366F1] hover:bg-[#4F46E5]"
                >
                  Browse Properties
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
export default PropertiesSection;