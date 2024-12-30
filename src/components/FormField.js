import React from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

const FormField = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled,
  required,
  icon: Icon,
  isTextarea
}) => {
  const inputClasses = "w-full pl-10 bg-white border border-gray-200 rounded-lg";
  
  return (
    <div className="space-y-2">
      <Label className="text-gray-900 font-medium">{label}</Label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        )}
        {isTextarea ? (
          <Textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${inputClasses} min-h-[100px]`}
            disabled={disabled}
            required={required}
          />
        ) : (
          <Input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={inputClasses}
            disabled={disabled}
            required={required}
          />
        )}
      </div>
    </div>
  );
};

export default FormField;