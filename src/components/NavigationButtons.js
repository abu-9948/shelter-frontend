import React from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NavigationButtons = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  isLoading
}) => {
  return (
    <div className="flex justify-between mt-8">
      <Button
        onClick={onPrevious}
        disabled={currentStep === 1 || isLoading}
        variant="outline"
        className="flex items-center gap-2 text-gray-600"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <Button
        onClick={onNext}
        disabled={isLoading}
        className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#5558D9] text-white"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default NavigationButtons;