import React from 'react';
import { useField } from 'formik';
import { ExclamationTriangleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface CheckboxFieldProps {
  name: string;
  label: string;
  disabled?: boolean;
  className?: string;
  warning?: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  disabled = false,
  className = '',
  warning,
  ...props
}) => {
  const [field, meta] = useField({ name, type: 'checkbox' });
  
  const hasError = meta.touched && meta.error;
  const hasWarning = meta.touched && warning && !hasError;

  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            {...field}
            {...props}
            id={name}
            type="checkbox"
            disabled={disabled}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? `${name}-error` : hasWarning ? `${name}-warning` : undefined}
          />
        </div>
        
        <div className="ml-3 flex-1">
          <label htmlFor={name} className="text-sm font-medium text-gray-700">
            {label}
          </label>
          
          {(hasError || hasWarning) && (
            <div className="flex items-center mt-1">
              {hasError ? (
                <ExclamationCircleIcon className="h-4 w-4 text-red-500 mr-1" aria-hidden="true" />
              ) : (
                <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500 mr-1" aria-hidden="true" />
              )}
              
              {hasError && (
                <p className="text-sm text-red-600" id={`${name}-error`}>
                  {meta.error}
                </p>
              )}
              
              {hasWarning && (
                <p className="text-sm text-yellow-600" id={`${name}-warning`}>
                  {warning}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckboxField;