import React, { memo } from 'react';
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";


const locations = [
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'pune', label: 'Pune' },
    { value: 'visakhapatnam', label: 'Visakhapatnam' },
];

// Memoized input components to prevent re-renders
const SearchInput = memo(({ value, onChange }) => (
    <div className="space-y-2">
        <Label>Search</Label>
        <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
                name="search"
                placeholder="Search accommodations..."
                value={value}
                onChange={onChange}
                className="pl-10"
            />
        </div>
    </div>
));

const CompanyInput = memo(({ value, onChange }) => (
    <div className="space-y-2">
        <Label>Company</Label>
        <div className="relative">
            <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
                name="companyName"
                placeholder="Company name"
                value={value}
                onChange={onChange}
                className="pl-10"
            />
        </div>
    </div>
));

// Modify the PriceInputs component to fix the dropdown and add sorting
const PriceInputs = memo(({ filters, minPrice, maxPrice, onFilterChange }) => {
    // Generate price ranges dynamically
    const generatePriceRanges = () => {
        const ranges = [];
        ranges.push({
            id: 'all',
            label: 'All Prices',
            value: 'all',
            min: null,
            max: null
        });

        const range = maxPrice - minPrice;
        const step = Math.ceil(range / 5 / 1000) * 1000;

        for (let i = 0; i < 5; i++) {
            const rangeMin = minPrice + (i * step);
            const rangeMax = i === 4 ? maxPrice : minPrice + ((i + 1) * step);

            ranges.push({
                id: `range${i + 1}`,
                label: i === 4
                    ? `Above ₹${rangeMin.toLocaleString('en-IN')}`
                    : `₹${rangeMin.toLocaleString('en-IN')} - ₹${rangeMax.toLocaleString('en-IN')}`,
                value: `${rangeMin}-${rangeMax}`,
                min: rangeMin,
                max: rangeMax
            });
        }

        return ranges;
    };

    const priceRanges = generatePriceRanges();

    const getCurrentRange = () => {
        const min = filters.minPrice; // Changed from tempInputs to filters
        const max = filters.maxPrice; // Changed from tempInputs to filters

        if (min === null && max === null) return 'all';

        // Find the exact range match or custom range
        const selectedRange = priceRanges.find(range =>
            range.min === min && range.max === max
        );

        if (selectedRange) return selectedRange.value;

        // If no exact match found, it's a custom range
        return `${min}-${max}`;
    };

    const handleRangeChange = (value) => {
        if (value === 'all') {
            onFilterChange({
                target: {
                    name: 'minPrice',
                    value: null
                }
            });
            onFilterChange({
                target: {
                    name: 'maxPrice',
                    value: null
                }
            });
            return;
        }

        const [min, max] = value.split('-').map(Number);
        onFilterChange({
            target: {
                name: 'minPrice',
                value: min
            }
        });
        onFilterChange({
            target: {
                name: 'maxPrice',
                value: max
            }
        });
    };

    return (
        <div className="space-y-4">
            <Label>Price Range</Label>
            <Select
                value={getCurrentRange()}
                onValueChange={handleRangeChange}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                    {priceRanges.map((range) => (
                        <SelectItem key={range.id} value={range.value}>
                            {range.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Price Sorting Radio Buttons */}
            <div className="space-y-2">
                <Label>Sort by Price</Label>
                <RadioGroup
                    value={filters.sortPrice || ''}
                    onValueChange={(value) => {
                        // If clicking the same radio button, clear the selection
                        if (value === filters.sortPrice) {
                            onFilterChange({
                                target: {
                                    name: 'sortPrice',
                                    value: null
                                }
                            });
                        } else {
                            onFilterChange({
                                target: {
                                    name: 'sortPrice',
                                    value: value
                                }
                            });
                        }
                    }}
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="desc" id="highToLow" />
                        <Label htmlFor="highToLow">High to Low</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="asc" id="lowToHigh" />
                        <Label htmlFor="lowToHigh">Low to High</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
});

const FilterContent = memo(({
    filters,
    tempInputs,
    accommodations,
    onFilterChange,
    onInputChange,
    onApplyFilters,
    onClearFilters,
    isLoading,
}) => {

    const DEFAULT_MIN_PRICE = 0;
    const DEFAULT_MAX_PRICE = 100000;
    const maxPrice = accommodations?.length > 0
        ? Math.max(...accommodations.map(acc => acc.price), 0)
        : DEFAULT_MAX_PRICE;

    const minPrice = accommodations?.length > 0
        ? Math.min(...accommodations.map(acc => acc.price), 0)
        : DEFAULT_MIN_PRICE;

    const handleLocationChange = (value) => {
        onFilterChange({
            target: {
                name: 'location',
                value: value
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Location Dropdown */}
            <div className="space-y-2">
                <Label>Location</Label>
                <Select
                    value={filters.location}
                    onValueChange={handleLocationChange}
                >
                    <SelectTrigger className="w-full">
                        <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            <SelectValue placeholder="Select location" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        {locations.map((location) => (
                            <SelectItem key={location.value} value={location.value}>
                                {location.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-4">
                <SearchInput
                    value={tempInputs.search}
                    onChange={onInputChange}
                />
                <CompanyInput
                    value={tempInputs.companyName}
                    onChange={onInputChange}
                />
            </div>

            <PriceInputs
                filters={filters}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onFilterChange={onFilterChange}
            />

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
                    className="w-full bg-[#6366F1] hover:bg-[#5558D9] disabled:opacity-50"
                    onClick={onApplyFilters}
                    disabled={isLoading || (
                        !tempInputs.search &&
                        !tempInputs.companyName &&
                        tempInputs.minPrice === null &&
                        tempInputs.maxPrice === null &&
                        !filters.location &&
                        !filters.rating &&
                        !filters.showFavorites
                    )}
                >
                    <div className="flex items-center justify-center">
                        {isLoading ? (
                            <>
                                <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Applying...
                            </>
                        ) : (
                            <>
                                <Filter className="h-4 w-4 mr-2" />
                                Apply Filters
                            </>
                        )}
                    </div>
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
});

export default FilterContent;