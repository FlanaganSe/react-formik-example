import React from 'react';
import { useField } from 'formik';
import { ExclamationTriangleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface TextAreaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
  warning?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  placeholder,
  disabled = false,
  rows = 4,
  className = '',
  warning,
  ...props
}) => {
  const [field, meta] = useField(name);
  
  const hasError = meta.touched && meta.error;
  const hasWarning = meta.touched && warning && !hasError;
  
  const getFieldClasses = () => {
    let classes = 'form-input resize-y';
    
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
        <textarea
          {...field}
          {...props}
          id={name}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          className={getFieldClasses()}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${name}-error` : hasWarning ? `${name}-warning` : undefined}
        />
        
        {(hasError || hasWarning) && (
          <div className="absolute top-2 right-2 pointer-events-none">
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

export default TextAreaField;