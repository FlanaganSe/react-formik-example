import React, { useCallback } from 'react';
import { Formik, Form } from 'formik';
import { FormField, CheckboxField, FormButton } from '../ui';
import { registrationSchema } from '../../schemas/validationSchemas';
import { apiService } from '../../services/apiService';
import { useFormSubmission } from '../../hooks/useFormSubmission';
import { formatPhone } from '../../utils';
import type { RegistrationForm as RegistrationFormData } from '../../types';

const RegistrationForm: React.FC = () => {
  const initialValues: RegistrationFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeToTerms: false,
    newsletter: false,
  };

  const handleSubmit = useFormSubmission(apiService.register, 'Registration');

  const createPhoneChangeHandler = useCallback((setFieldValue: (field: string, value: string) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhone(e.target.value);
      setFieldValue('phone', formatted);
    };
  }, []);


  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Account</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={registrationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ setFieldValue }) => {
          const handlePhoneChange = createPhoneChangeHandler(setFieldValue);

          return (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your first name"
                />
                
                <FormField
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your last name"
                />
              </div>
              
              <FormField
                name="email"
                label="Email Address"
                type="email"
                placeholder="Enter your email"
              />
              
              <FormField
                name="password"
                label="Password"
                type="password"
                placeholder="Create a strong password"
              />
              
              <FormField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
              />
              
              <FormField
                name="phone"
                label="Phone Number"
                placeholder="(123) 456-7890"
                onChange={handlePhoneChange}
              />
              
              <div className="space-y-3 pt-2">
                <CheckboxField
                  name="agreeToTerms"
                  label="I agree to the Terms of Service and Privacy Policy"
                />
                
                <CheckboxField
                  name="newsletter"
                  label="Subscribe to our newsletter for updates and tips"
                />
              </div>
              
              <div className="pt-4">
                <FormButton type="submit" className="w-full">
                  Create Account
                </FormButton>
              </div>
              
              <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button type="button" className="text-blue-600 hover:text-blue-500 font-medium">
                  Sign in
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RegistrationForm;