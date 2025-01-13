import React from 'react';
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Search,
  MapPin,
  Building2,
  FilterX,
  Filter,
  Star,
  Heart
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const FilterSidebar = ({
  filters,
  setFilters,
  accommodations,
  onFilterChange,
  onClearFilters,
  showMobileFilters,
  setShowMobileFilters,
  favorites,
  isLoading
}) => {
  const maxPrice = Math.max(...accommodations.map(acc => acc.price), 0);
  const minPrice = Math.min(...accommodations.map(acc => acc.price), 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              name="search"
              placeholder="Search accommodations..."
              value={filters.search}
              onChange={onFilterChange}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              name="location"
              placeholder="Location"
              value={filters.location}
              onChange={onFilterChange}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Company</Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              name="companyName"
              placeholder="Company name"
              value={filters.companyName}
              onChange={onFilterChange}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Price Range Section */}
      <div className="space-y-4">
        <Label>Price Range</Label>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ''}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                onFilterChange({
                  target: {
                    name: 'minPrice',
                    value: isNaN(value) ? null : Math.min(value, filters.maxPrice || maxPrice)
                  }
                });
              }}
              className="w-24"
              prefix="₹"
            />
            <span className="text-gray-500">to</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ''}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                onFilterChange({
                  target: {
                    name: 'maxPrice',
                    value: isNaN(value) ? null : Math.max(value, filters.minPrice || minPrice)
                  }
                });
              }}
              className="w-24"
              prefix="₹"
            />
          </div>
          <Slider
            value={[filters.minPrice || minPrice, filters.maxPrice || maxPrice]}
            max={maxPrice}
            min={minPrice}
            step={100}
            onValueChange={(value) => {
              onFilterChange({
                target: {
                  name: 'minPrice',
                  value: value[0]
                }
              });
              onFilterChange({
                target: {
                  name: 'maxPrice',
                  value: value[1]
                }
              });
            }}
            className="mt-2"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>₹{(filters.minPrice || minPrice).toLocaleString('en-IN')}</span>
            <span>₹{(filters.maxPrice || maxPrice).toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-4">
        <Label>Minimum Rating</Label>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Button
              key={rating}
              variant={filters.rating >= rating ? "default" : "outline"}
              size="sm"
              onClick={() => {
                onFilterChange({
                  target: {
                    name: 'rating',
                    value: filters.rating === rating ? 0 : rating
                  }
                });
              }}
              className="p-2"
            >
              <Star className={`h-4 w-4 ${filters.rating >= rating ? "fill-current" : ""}`} />
            </Button>
          ))}
        </div>
      </div>

      {/* Favorites Filter */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="favorites"
            checked={filters.showFavorites}
            onCheckedChange={(checked) => {
              onFilterChange({
                target: {
                  name: 'showFavorites',
                  value: checked
                }
              });
            }}
          />
          <Label htmlFor="favorites" className="flex items-center space-x-2">
            <span>Show Favorites Only</span>
            <Heart className="h-4 w-4 text-red-500" />
          </Label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button
          variant="default"
          className="w-full bg-[#6366F1] hover:bg-[#5558D9]"
          disabled={isLoading}
        >
          <Filter className="h-4 w-4 mr-2" />
          Apply Filters
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={onClearFilters}
          disabled={isLoading}
        >
          <FilterX className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      </div>

      {/* Results Count */}
      <div className="pt-4 border-t">
        <div className="flex items-center gap-2 text-gray-600 justify-center">
          <span>{accommodations.length} accommodations found</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Card className="hidden lg:block w-80 p-6">
        <CardContent className="p-0">
          <FilterContent />
        </CardContent>
      </Card>

      {/* Mobile Sheet */}
      <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="lg:hidden fixed bottom-4 right-4 z-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default FilterSidebar;