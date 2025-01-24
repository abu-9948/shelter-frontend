import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger
} from "../components/ui/alert-dialog";
import { Edit2, Trash2, MapPin, IndianRupee, Loader2, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const AccommodationList = ({
  accommodations = [],
  isLoading = false,
  isDeleting = false,
  showActions = true,
  onDelete,
  gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  showFavorites = false,
  onToggleFavorite,
  userId,
  onAccommodationClick,
  setAccommodations
}) => {
  const navigate = useNavigate();
  const [updatingId, setUpdatingId] = React.useState(null);
  const [localAccommodations, setLocalAccommodations] = React.useState(accommodations);

  React.useEffect(() => {
    setLocalAccommodations(accommodations);
  }, [accommodations]);

  const handleAvailabilityToggle = async (accommodation) => {
    try {
      setUpdatingId(accommodation._id);
      const newAvailableStatus = !accommodation.available;
      setLocalAccommodations(prev =>
        prev.map(acc =>
          acc._id === accommodation._id
            ? { ...acc, available: newAvailableStatus }
            : acc
        )
      );

      const response = await axios.put(`${process.env.REACT_APP_ACCOMMODATION}/update/${accommodation._id}`, {
        ...accommodation,
        available: newAvailableStatus,
        userId
      });

      if (response.status === 200) {
        toast.success(`${accommodation.name} is now ${newAvailableStatus ? 'available' : 'unavailable'}`);
        setAccommodations?.(localAccommodations);
      } else {
        setLocalAccommodations(prev =>
          prev.map(acc =>
            acc._id === accommodation._id
              ? { ...acc, available: accommodation.available }
              : acc
          )
        );
        toast.error(`Failed to update ${accommodation.name}'s availability`);
      }
    } catch (error) {
      toast.error(`Failed to update ${accommodation.name}'s availability`);
      setLocalAccommodations(prev =>
        prev.map(acc =>
          acc._id === accommodation._id
            ? { ...acc, available: accommodation.available }
            : acc
        )
      );
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (localAccommodations.length === 0) {
    return (
      <div className="col-span-full flex items-center justify-center h-40 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500">No accommodations found</p>
      </div>
    );
  }

  const handleCardClick = (e, accommodationId) => {
    if (e.target.closest('button')) return;
    onAccommodationClick?.(accommodationId);
  };

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {localAccommodations.map((accommodation) => (
        <Card
          key={accommodation._id}
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={(e) => handleCardClick(e, accommodation._id)}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">{accommodation.name}</CardTitle>
            <div className="flex space-x-2 items-center">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {accommodation.available ? 'Available' : 'Unavailable'}
                </span>
                <Switch
                  checked={accommodation.available}
                  disabled={updatingId === accommodation._id}
                  onCheckedChange={() => handleAvailabilityToggle(accommodation)}
                  className="data-[state=checked]:bg-[#6366F1]"
                />
              </div>
              {showFavorites && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(accommodation._id, true);
                  }}
                  className="text-rose-500 hover:text-rose-600"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </Button>
              )}
              {showActions && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/manage-accommodation/${accommodation._id}`);
                    }}
                    disabled={isDeleting}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        disabled={isDeleting}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Accommodation</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this accommodation? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(accommodation._id);
                          }}
                          className="bg-red-600 hover:bg-red-700"
                          disabled={isDeleting}
                        >
                          {isDeleting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Deleting...
                            </>
                          ) : 'Delete'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="mr-2 h-4 w-4" />
                {accommodation.location}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <IndianRupee className="mr-2 h-4 w-4" />
                {accommodation.price}/month
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{accommodation.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AccommodationList;