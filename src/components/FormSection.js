import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import FormField from './FormField';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

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
  const [touched, setTouched] = useState({});
  const isLastStep = currentStep === totalSteps;

  const validateStep = () => {
    const currentFields = fields.filter(field => field.required);
    const emptyFields = currentFields.filter(field => {
      const value = values[field.name];
      return !value || (typeof value === 'string' && value.trim() === '');
    });

    if (emptyFields.length > 0) {
      const fieldNames = emptyFields.map(field => field.label).join(', ');
      toast.error(`Please fill in required fields: ${fieldNames}`);
      const newTouched = {};
      emptyFields.forEach(field => {
        newTouched[field.name] = true;
      });
      setTouched(prev => ({ ...prev, ...newTouched }));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      onNext();
    }
  };

  const handleFieldBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const isFieldInvalid = (field) => {
    return field.required && 
           touched[field.name] && 
           (!values[field.name] || (typeof values[field.name] === 'string' && values[field.name].trim() === ''));
  };

  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <span className="text-gray-500">Step {currentStep} of {totalSteps}</span>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {fields.map((field) => (
            <div key={field.name} className={field.isCustom ? 'col-span-1' : 'md:col-span-1'}>
              <div className="space-y-1">
                {field.isCustom ? (
                  field.render()
                ) : (
                  <>
                    <FormField
                      {...field}
                      value={values[field.name]}
                      onChange={onChange}
                      onBlur={() => handleFieldBlur(field.name)}
                      disabled={isLoading}
                      error={isFieldInvalid(field)}
                    />
                    {isFieldInvalid(field) && (
                      <p className="text-sm text-red-500">
                        {field.label} is required
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
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
                onClick={() => validateStep() && onSubmit()}
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
              onClick={handleNext}
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