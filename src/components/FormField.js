import React from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const FormField = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  disabled,
  required,
  icon: Icon,
  isTextarea,
  isSelect,
  options = [],
  error
}) => {
  const inputClasses = `w-full pl-10 bg-white border rounded-lg 
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'}`;
  
  const handleSelectChange = (newValue) => {
    onChange({
      target: {
        name,
        value: newValue
      }
    });
  };

  return (
    <div className="space-y-2">
      <Label className="text-gray-900 font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
        )}
        
        {isSelect ? (
          <Select
            name={name}
            value={value}
            onValueChange={handleSelectChange}
            disabled={disabled}
            onOpenChange={(isOpen) => !isOpen && onBlur?.()}
          >
            <SelectTrigger className={inputClasses}>
              <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : isTextarea ? (
          <Textarea
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
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
            onBlur={onBlur}
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