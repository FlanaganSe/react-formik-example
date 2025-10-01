import React, { useCallback } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { FormField, CheckboxField, SelectField, FormButton } from '../ui';
import { registrationSchema } from '../../schemas/validationSchemas';
import { apiService } from '../../services/apiService';
import { useFormSubmission } from '../../hooks/useFormSubmission';
import { formatPhone } from '../../utils';
import type { RegistrationForm as RegistrationFormData, Address, Skill } from '../../types';

const RegistrationForm: React.FC = () => {
  const initialValues: RegistrationFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    addresses: [
      {
        id: '1',
        type: 'home' as const,
        street: '',
        apartment: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA',
        isPrimary: true,
      },
    ],
    employment: {
      status: 'employed' as const,
      company: {
        name: '',
        website: '',
        industry: '',
        size: 'medium' as const,
      },
      position: '',
      startDate: '',
      skills: [
        {
          name: '',
          level: 'intermediate' as const,
          yearsOfExperience: 0,
        },
      ],
    },
    preferences: {
      theme: 'light' as const,
      language: 'en',
      timezone: 'America/New_York',
      notifications: {
        email: true,
        sms: false,
        push: true,
      },
      privacy: {
        profileVisibility: 'public' as const,
        showEmail: false,
        showPhone: false,
      },
    },
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

  const addressTypeOptions = [
    { value: 'home', label: 'Home' },
    { value: 'work', label: 'Work' },
    { value: 'billing', label: 'Billing' },
    { value: 'shipping', label: 'Shipping' },
  ];

  const employmentStatusOptions = [
    { value: 'employed', label: 'Employed' },
    { value: 'self-employed', label: 'Self-Employed' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'student', label: 'Student' },
  ];

  const companySizeOptions = [
    { value: 'startup', label: 'Startup (1-10)' },
    { value: 'small', label: 'Small (11-50)' },
    { value: 'medium', label: 'Medium (51-200)' },
    { value: 'large', label: 'Large (201-1000)' },
    { value: 'enterprise', label: 'Enterprise (1000+)' },
  ];

  const skillLevelOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' },
  ];

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'Auto' },
  ];

  const visibilityOptions = [
    { value: 'public', label: 'Public' },
    { value: 'private', label: 'Private' },
    { value: 'friends', label: 'Friends Only' },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Account</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={registrationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ values, setFieldValue }) => {
          const handlePhoneChange = createPhoneChangeHandler(setFieldValue);

          return (
            <Form className="space-y-8">
              {/* Personal Information */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
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

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <FormField
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                  />

                  <FormField
                    name="phone"
                    label="Phone Number"
                    placeholder="(123) 456-7890"
                    onChange={handlePhoneChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <FormField
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
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
                </div>
              </div>

              {/* Addresses */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Addresses</h3>
                <FieldArray name="addresses">
                  {({ push, remove }) => (
                    <div className="space-y-6">
                      {values.addresses.map((address: Address, index: number) => (
                        <div key={address.id} className="border border-gray-200 p-4 rounded-md bg-gray-50">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium text-gray-700">Address {index + 1}</h4>
                            {values.addresses.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <SelectField
                              name={`addresses.${index}.type`}
                              label="Address Type"
                              options={addressTypeOptions}
                            />

                            <div className="flex items-center pt-6">
                              <CheckboxField
                                name={`addresses.${index}.isPrimary`}
                                label="Primary Address"
                              />
                            </div>
                          </div>

                          <div className="mt-4">
                            <FormField
                              name={`addresses.${index}.street`}
                              label="Street Address"
                              placeholder="123 Main Street"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <FormField
                              name={`addresses.${index}.apartment`}
                              label="Apartment/Suite (Optional)"
                              placeholder="Apt 4B"
                            />

                            <FormField
                              name={`addresses.${index}.city`}
                              label="City"
                              placeholder="New York"
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-4 mt-4">
                            <FormField
                              name={`addresses.${index}.state`}
                              label="State"
                              placeholder="NY"
                            />

                            <FormField
                              name={`addresses.${index}.zipCode`}
                              label="ZIP Code"
                              placeholder="10001"
                            />

                            <FormField
                              name={`addresses.${index}.country`}
                              label="Country"
                              placeholder="USA"
                            />
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => push({
                          id: Date.now().toString(),
                          type: 'home' as const,
                          street: '',
                          apartment: '',
                          city: '',
                          state: '',
                          zipCode: '',
                          country: 'USA',
                          isPrimary: false,
                        })}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        + Add Another Address
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Employment */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Employment Information</h3>

                <div className="grid grid-cols-2 gap-4">
                  <SelectField
                    name="employment.status"
                    label="Employment Status"
                    options={employmentStatusOptions}
                  />

                  <FormField
                    name="employment.position"
                    label="Position/Title"
                    placeholder="Software Engineer"
                  />
                </div>

                <div className="mt-6">
                  <h4 className="font-medium text-gray-700 mb-3">Company Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      name="employment.company.name"
                      label="Company Name"
                      placeholder="Acme Corporation"
                    />

                    <FormField
                      name="employment.company.website"
                      label="Company Website"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <FormField
                      name="employment.company.industry"
                      label="Industry"
                      placeholder="Technology"
                    />

                    <SelectField
                      name="employment.company.size"
                      label="Company Size"
                      options={companySizeOptions}
                    />
                  </div>

                  <div className="mt-4">
                    <FormField
                      name="employment.startDate"
                      label="Start Date"
                      type="date"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium text-gray-700 mb-3">Skills</h4>
                  <FieldArray name="employment.skills">
                    {({ push, remove }) => (
                      <div className="space-y-4">
                        {values.employment.skills.map((_skill: Skill, index: number) => (
                          <div key={index} className="border border-gray-200 p-4 rounded-md bg-gray-50">
                            <div className="flex justify-between items-center mb-3">
                              <h5 className="text-sm font-medium text-gray-700">Skill {index + 1}</h5>
                              {values.employment.skills.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="text-red-600 hover:text-red-800 text-sm"
                                >
                                  Remove
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                              <FormField
                                name={`employment.skills.${index}.name`}
                                label="Skill Name"
                                placeholder="React"
                              />

                              <SelectField
                                name={`employment.skills.${index}.level`}
                                label="Skill Level"
                                options={skillLevelOptions}
                              />

                              <FormField
                                name={`employment.skills.${index}.yearsOfExperience`}
                                label="Years of Experience"
                                type="number"
                                placeholder="3"
                              />
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => push({
                            name: '',
                            level: 'intermediate' as const,
                            yearsOfExperience: 0,
                          })}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          + Add Another Skill
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>
              </div>

              {/* Preferences */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>

                <div className="grid grid-cols-3 gap-4">
                  <SelectField
                    name="preferences.theme"
                    label="Theme"
                    options={themeOptions}
                  />

                  <FormField
                    name="preferences.language"
                    label="Language"
                    placeholder="en"
                  />

                  <FormField
                    name="preferences.timezone"
                    label="Timezone"
                    placeholder="America/New_York"
                  />
                </div>

                <div className="mt-6">
                  <h4 className="font-medium text-gray-700 mb-3">Notification Settings</h4>
                  <div className="space-y-2">
                    <CheckboxField
                      name="preferences.notifications.email"
                      label="Email Notifications"
                    />
                    <CheckboxField
                      name="preferences.notifications.sms"
                      label="SMS Notifications"
                    />
                    <CheckboxField
                      name="preferences.notifications.push"
                      label="Push Notifications"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium text-gray-700 mb-3">Privacy Settings</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <SelectField
                      name="preferences.privacy.profileVisibility"
                      label="Profile Visibility"
                      options={visibilityOptions}
                    />
                  </div>
                  <div className="space-y-2 mt-3">
                    <CheckboxField
                      name="preferences.privacy.showEmail"
                      label="Show Email on Profile"
                    />
                    <CheckboxField
                      name="preferences.privacy.showPhone"
                      label="Show Phone on Profile"
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="space-y-3">
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
