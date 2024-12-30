import React from 'react';
import { Card, CardContent } from './ui/card';
import FormField from './FormField';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

const FormSection = ({ 
  title, 
  currentStep, 
  totalSteps,
  fields,
  values,
  onChange,
  onPrevious,
  onNext,
  onSubmit,
  onCancel,
  isLoading,
  isEdit
}) => {
  const isLastStep = currentStep === totalSteps;

  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <span className="text-gray-500">Step {currentStep} of {totalSteps}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <FormField
              key={field.name}
              {...field}
              value={values[field.name]}
              onChange={onChange}
              disabled={isLoading}
            />
          ))}
        </div>

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

          {isLastStep ? (
            <div className="flex gap-4">
              {isEdit && (
                <Button
                  onClick={onCancel}
                  variant="outline"
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  Cancel
                </Button>
              )}
              <Button
                onClick={onSubmit}
                disabled={isLoading}
                className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#5558D9] text-white"
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
            </div>
          ) : (
            <Button
              onClick={onNext}
              disabled={isLoading}
              className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#5558D9] text-white"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FormSection;