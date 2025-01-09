import React, { useState } from 'react';
import { Building2, MapPin, IndianRupee, Star, Building, Phone, Users, Hash, FileText } from 'lucide-react';
import ProgressSteps from './ProgressSteps';
import FormSection from './FormSection';

const AccommodationForm = ({
  accommodation,
  onChange,
  onSubmit,
  isLoading,
  isEdit,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const formSections = {
    1: {
      title: isEdit ? 'Edit Accommodation' : 'Post New Accommodation',
      fields: [
        { label: 'Property Name', name: 'name', icon: Building2, required: true, placeholder: 'Enter property name' },
        { label: 'Location', name: 'location', icon: MapPin, required: true, placeholder: 'Enter city or area' },
        { label: 'Monthly Price', name: 'price', icon: IndianRupee, type: 'number', required: true, placeholder: 'Enter monthly rent' }
      ]
    },
    2: {
      title: isEdit ? 'Edit Accommodation' : 'Post New Accommodation',
      fields: [
        { label: 'Company Name', name: 'companyName', icon: Building, placeholder: 'Enter company name' },
        { label: 'Phone Number', name: 'phone', icon: Phone, placeholder: 'Enter contact number' },
        { label: 'Available Spaces', name: 'available_spaces', icon: Users, type: 'number', placeholder: 'Enter number of spaces' },
        { label: 'Flat Number', name: 'flatNumber', icon: Hash, placeholder: 'Enter flat/unit number' },
        { label: 'Full Address', name: 'address', icon: FileText, isTextarea: true, placeholder: 'Enter complete address details' }
      ]
    },
    3: {
      title: isEdit ? 'Edit Accommodation' : 'Post New Accommodation',
      fields: [
        { label: 'Amenities', name: 'amenities', icon: FileText, isTextarea: true, placeholder: 'List amenities (e.g., WiFi, Parking, Gym)' },
        { label: 'Description', name: 'description', icon: FileText, isTextarea: true, placeholder: 'Enter detailed description of the property' }
      ]
    }
  };

  const handlePrevious = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 3));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ProgressSteps currentStep={currentStep} />
      
      <FormSection
        {...formSections[currentStep]}
        currentStep={currentStep}
        totalSteps={3}
        values={accommodation}
        onChange={onChange}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={onSubmit}
        onCancel={onCancel}
        isLoading={isLoading}
        isEdit={isEdit}
      />
    </div>
  );
};

export default AccommodationForm;