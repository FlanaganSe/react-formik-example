import React from 'react';
import { useField } from 'formik';
import { ExclamationTriangleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  options: SelectOption[];
  disabled?: boolean;
  className?: string;
  warning?: string;
  placeholder?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  disabled = false,
  className = '',
  warning,
  placeholder = 'Select an option...',
  ...props
}) => {
  const [field, meta] = useField(name);
  
  const hasError = meta.touched && meta.error;
  const hasWarning = meta.touched && warning && !hasError;
  
  const getFieldClasses = () => {
    let classes = 'form-input';
    
    if (hasError) {
      classes += ' form-input-error';
    } else if (hasWarning) {
      classes += ' form-input-warning';
    }
    
    return `${classes} ${className}`;
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      <div className="relative">
        <select
          {...field}
          {...props}
          id={name}
          disabled={disabled}
          className={getFieldClasses()}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${name}-error` : hasWarning ? `${name}-warning` : undefined}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {(hasError || hasWarning) && (
          <div className="absolute inset-y-0 right-8 pr-3 flex items-center pointer-events-none">
            {hasError ? (
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
            ) : (
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" aria-hidden="true" />
            )}
          </div>
        )}
      </div>
      
      {hasError && (
        <p className="mt-1 text-sm text-red-600" id={`${name}-error`}>
          {meta.error}
        </p>
      )}
      
      {hasWarning && (
        <p className="mt-1 text-sm text-yellow-600" id={`${name}-warning`}>
          {warning}
        </p>
      )}
    </div>
  );
};

export default SelectField;