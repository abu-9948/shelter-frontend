import React from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Star, 
  Building, 
  Phone, 
  Users, 
  Hash,
  FileText,
  ListChecks,
  Loader2 
} from 'lucide-react';

const AccommodationForm = ({
    accommodation,
    onChange,
    onSubmit,
    isLoading,
    isEdit,
    onCancel,
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    {isEdit ? 'Edit Accommodation' : 'Post New Accommodation'}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Property Name *</Label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                name="name"
                                value={accommodation.name}
                                onChange={onChange}
                                placeholder="Enter property name"
                                className="pl-10"
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Location *</Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                name="location"
                                value={accommodation.location}
                                onChange={onChange}
                                placeholder="Enter city or area"
                                className="pl-10"
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Monthly Price *</Label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                name="price"
                                type="number"
                                value={accommodation.price}
                                onChange={onChange}
                                placeholder="Enter monthly rent"
                                className="pl-10"
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Rating (0-5)</Label>
                        <div className="relative">
                            <Star className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                name="rating"
                                type="number"
                                min="0"
                                max="5"
                                value={accommodation.rating}
                                onChange={onChange}
                                placeholder="Enter rating (0-5)"
                                className="pl-10"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Company Name</Label>
                        <div className="relative">
                            <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                name="companyName"
                                value={accommodation.companyName}
                                onChange={onChange}
                                placeholder="Enter company name"
                                className="pl-10"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                name="phone"
                                value={accommodation.phone}
                                onChange={onChange}
                                placeholder="Enter contact number"
                                className="pl-10"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Available Spaces</Label>
                        <div className="relative">
                            <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                name="available_spaces"
                                type="number"
                                value={accommodation.available_spaces}
                                onChange={onChange}
                                placeholder="Enter number of spaces"
                                className="pl-10"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Flat Number</Label>
                        <div className="relative">
                            <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                name="flatNumber"
                                value={accommodation.flatNumber}
                                onChange={onChange}
                                placeholder="Enter flat/unit number"
                                className="pl-10"
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Full Address</Label>
                    <div className="relative">
                        <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Textarea
                            name="address"
                            value={accommodation.address}
                            onChange={onChange}
                            placeholder="Enter complete address details"
                            className="min-h-[80px] pl-10"
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Amenities</Label>
                    <div className="relative">
                        <ListChecks className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Textarea
                            name="amenities"
                            value={accommodation.amenities}
                            onChange={onChange}
                            placeholder="List amenities (e.g., WiFi, Parking, Gym)"
                            className="min-h-[80px] pl-10"
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Description</Label>
                    <div className="relative">
                        <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Textarea
                            name="description"
                            value={accommodation.description}
                            onChange={onChange}
                            placeholder="Enter detailed description of the property"
                            className="min-h-[120px] pl-10"
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button
                        onClick={onSubmit}
                        disabled={isLoading}
                        className="flex-1 bg-lime-600 hover:bg-lime-700"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {isEdit ? 'Saving Changes...' : 'Posting...'}
                            </>
                        ) : (
                            isEdit ? 'Save Changes' : 'Post Accommodation'
                        )}
                    </Button>
                    {isEdit && (
                        <Button
                            onClick={onCancel}
                            variant="outline"
                            disabled={isLoading}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default AccommodationForm;