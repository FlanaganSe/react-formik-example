import React, { createContext, useContext, ReactNode } from 'react';
import { FormState, ValidationMessage } from '../types';

interface FormikContextValue {
  submitForm: (formData: any, formName?: string) => Promise<void>;
  validateField: (fieldName: string, value: any) => Promise<ValidationMessage[]>;
  formatField: (fieldName: string, value: any) => any;
  getFieldState: (formState: FormState, fieldName: string) => {
    hasError: boolean;
    hasWarning: boolean;
    errorMessage?: string;
    warningMessage?: string;
  };
}

const FormikContext = createContext<FormikContextValue | undefined>(undefined);

interface FormikProviderProps {
  children: ReactNode;
}

export const FormikProvider: React.FC<FormikProviderProps> = ({ children }) => {
  const submitForm = async (formData: any, formName = 'form'): Promise<void> => {
    console.log(`[Formik Context] Submitting ${formName}:`, formData);
    // This would typically handle global form submission logic
    // For now, we'll just log the form data
  };

  const validateField = async (fieldName: string, value: any): Promise<ValidationMessage[]> => {
    const validations: ValidationMessage[] = [];
    
    // Global validation rules that apply across all forms
    if (fieldName === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        validations.push({
          field: fieldName,
          message: 'Please enter a valid email address',
          type: 'error'
        });
      }
    }
    
    if (fieldName === 'password' && value) {
      if (value.length < 8) {
        validations.push({
          field: fieldName,
          message: 'Password must be at least 8 characters long',
          type: 'error'
        });
      }
      
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        validations.push({
          field: fieldName,
          message: 'Consider using uppercase, lowercase, and numbers for better security',
          type: 'warning'
        });
      }
    }
    
    return validations;
  };

  const formatField = (fieldName: string, value: any): any => {
    // Global field formatting logic
    switch (fieldName) {
      case 'phone':
        if (typeof value === 'string') {
          const cleaned = value.replace(/\D/g, '');
          const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
          if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
          }
        }
        return value;
      case 'name':
      case 'firstName':
      case 'lastName':
        return typeof value === 'string' ? value.trim() : value;
      default:
        return value;
    }
  };

  const getFieldState = (formState: FormState, fieldName: string) => {
    const hasError = Boolean(formState.errors[fieldName] && formState.touched[fieldName]);
    const hasWarning = Boolean(formState.warnings[fieldName] && formState.touched[fieldName]);
    
    return {
      hasError,
      hasWarning,
      errorMessage: hasError ? formState.errors[fieldName] : undefined,
      warningMessage: hasWarning ? formState.warnings[fieldName] : undefined,
    };
  };

  const value: FormikContextValue = {
    submitForm,
    validateField,
    formatField,
    getFieldState,
  };

  return <FormikContext.Provider value={value}>{children}</FormikContext.Provider>;
};

export const useFormikContext = (): FormikContextValue => {
  const context = useContext(FormikContext);
  if (context === undefined) {
    throw new Error('useFormikContext must be used within a FormikProvider');
  }
  return context;
};

export default FormikContext;