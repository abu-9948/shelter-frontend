import React from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import FilterContent from './FilterContent';

const FilterSidebar = ({
  filters,
  tempInputs,
  accommodations,
  onFilterChange,
  onInputChange,
  onApplyFilters,
  onClearFilters,
  showMobileFilters,
  setShowMobileFilters,
  isLoading
}) => {
  return (
    <>
      <Card className="hidden lg:block w-80 p-6">
        <CardContent className="p-0">
          <FilterContent
            filters={filters}
            tempInputs={tempInputs}
            accommodations={accommodations}
            onFilterChange={onFilterChange}
            onInputChange={onInputChange}
            onApplyFilters={onApplyFilters}
            onClearFilters={onClearFilters}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

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
            <FilterContent
              filters={filters}
              tempInputs={tempInputs}
              accommodations={accommodations}
              onFilterChange={onFilterChange}
              onInputChange={onInputChange}
              onApplyFilters={onApplyFilters}
              onClearFilters={onClearFilters}
              isLoading={isLoading}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default FilterSidebar;