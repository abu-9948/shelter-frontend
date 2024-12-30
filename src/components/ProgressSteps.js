import React from 'react';

const ProgressSteps = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Basic Info' },
    { number: 2, label: 'Property Details' },
    { number: 3, label: 'Additional Info' }
  ];

  return (
    <div className="flex items-center justify-between w-full mb-8 relative">
      <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-200" />
      <div 
        className="absolute top-4 left-0 h-[2px] bg-[#6366F1] transition-all duration-300"
        style={{ 
          width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
        }}
      />

      {steps.map((step, index) => (
        <div key={step.number} className="relative flex flex-col items-center">
          <div 
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 z-10
              ${currentStep >= step.number 
                ? 'border-[#6366F1] bg-blue-50 text-[#6366F1]' 
                : 'border-gray-300 bg-white text-gray-300'
              }`}
          >
            {step.number}
          </div>
          <span 
            className={`mt-2 text-sm font-medium
              ${currentStep >= step.number 
                ? 'text-[#6366F1]' 
                : 'text-gray-400'
              }`}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;