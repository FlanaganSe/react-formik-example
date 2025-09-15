import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { FormField, TextAreaField, SelectField, FormButton } from '../ui';
import { surveySchema, productFeedbackSchema } from '../../schemas/validationSchemas';
import { apiService } from '../../services/apiService';
import { useFormSubmission } from '../../hooks/useFormSubmission';
import type { SurveyForm as SurveyFormData, ProductFeedbackForm } from '../../types';

const SurveyForm: React.FC = () => {

  const surveyInitialValues: SurveyFormData = {
    name: '',
    email: '',
    age: 0,
    experience: 'beginner' as const,
    technologies: [],
    feedback: '',
    rating: 0,
  };

  const productFeedbackInitialValues: ProductFeedbackForm = {
    productName: '',
    category: 'software' as const,
    usageFrequency: 'weekly' as const,
    satisfaction: 0,
    features: [],
    improvements: '',
    recommendToFriend: false,
  };

  const experienceOptions = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (1-3 years)' },
    { value: 'advanced', label: 'Advanced (3+ years)' },
  ];

  const categoryOptions = [
    { value: 'software', label: 'Software' },
    { value: 'hardware', label: 'Hardware' },
    { value: 'service', label: 'Service' },
    { value: 'other', label: 'Other' },
  ];

  const usageFrequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'rarely', label: 'Rarely' },
  ];

  const technologyOptions = [
    'React', 'Vue', 'Angular', 'Svelte',
    'JavaScript', 'TypeScript', 'Python', 'Java',
    'Node.js', 'Express', 'Next.js', 'Nuxt.js',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis'
  ];

  const featureOptions = [
    'User Interface', 'Performance', 'Documentation', 'Support',
    'Integration', 'Customization', 'Security', 'Mobile Support',
    'Analytics', 'Collaboration', 'Reporting', 'API Access'
  ];

  const handleSurveySubmit = useFormSubmission(apiService.submitSurvey, 'Survey');
  const handleProductFeedbackSubmit = useFormSubmission(
    (data: ProductFeedbackForm) => apiService.submitProductFeedback(data),
    'Product Feedback'
  );


  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* First Form - Developer Experience Survey */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Developer Experience Survey</h2>
        <p className="text-gray-600 mb-6">
          Help us understand your development experience and preferences.
        </p>

        <Formik
          initialValues={surveyInitialValues}
          validationSchema={surveySchema}
          onSubmit={handleSurveySubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ values, setFieldValue }) => (
              <Form className="space-y-6">
                {/* Personal Information */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      name="name"
                      label="Full Name"
                      placeholder="Enter your full name"
                    />

                    <FormField
                      name="email"
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <FormField
                      name="age"
                      label="Age"
                      type="number"
                      placeholder="Enter your age"
                    />

                    <SelectField
                      name="experience"
                      label="Development Experience"
                      options={experienceOptions}
                    />
                  </div>
                </div>

                {/* Technologies */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Technologies</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Select all technologies you have experience with:
                  </p>

                  <FieldArray name="technologies">
                    {({ push, remove }) => (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {technologyOptions.map((tech) => (
                          <label key={tech} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                            <input
                              type="checkbox"
                              checked={values.technologies.includes(tech)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  push(tech);
                                } else {
                                  const index = values.technologies.indexOf(tech);
                                  if (index >= 0) remove(index);
                                }
                              }}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{tech}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </FieldArray>

                </div>

                {/* Feedback */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Feedback</h3>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Overall Rating (1-5)
                    </label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setFieldValue('rating', rating)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                            values.rating >= rating
                              ? 'bg-yellow-400 text-white'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <TextAreaField
                    name="feedback"
                    label="Additional Feedback"
                    placeholder="Share your thoughts, suggestions, or experiences..."
                    rows={4}
                  />
                </div>

                {/* Submit */}
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Your responses are anonymous and help improve our services
                  </p>

                  <div className="flex space-x-3">
                    <FormButton type="button" variant="secondary">
                      Save Draft
                    </FormButton>
                    <FormButton type="submit">
                      Submit Survey
                    </FormButton>
                  </div>
                </div>
              </Form>
          )}
        </Formik>
      </div>

      {/* Second Form - Product Feedback */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Feedback Form</h2>
        <p className="text-gray-600 mb-6">
          Share your experience with our products and help us improve.
        </p>

        <Formik
          initialValues={productFeedbackInitialValues}
          validationSchema={productFeedbackSchema}
          onSubmit={handleProductFeedbackSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ values, setFieldValue }) => (
              <Form className="space-y-6">
                {/* Product Information */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Product Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      name="productName"
                      label="Product Name"
                      placeholder="Enter the product name"
                    />

                    <SelectField
                      name="category"
                      label="Product Category"
                      options={categoryOptions}
                    />
                  </div>

                  <div className="mt-4">
                    <SelectField
                      name="usageFrequency"
                      label="How often do you use this product?"
                      options={usageFrequencyOptions}
                    />
                  </div>
                </div>

                {/* Features */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Which features do you find most valuable?
                  </p>

                  <FieldArray name="features">
                    {({ push, remove }) => (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {featureOptions.map((feature) => (
                          <label key={feature} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                            <input
                              type="checkbox"
                              checked={values.features.includes(feature)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  push(feature);
                                } else {
                                  const index = values.features.indexOf(feature);
                                  if (index >= 0) remove(index);
                                }
                              }}
                              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                </div>

                {/* Satisfaction & Feedback */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Your Experience</h3>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Satisfaction Rating (1-10)
                    </label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setFieldValue('satisfaction', rating)}
                          className={`w-8 h-8 rounded flex items-center justify-center text-xs font-medium transition-colors ${
                            values.satisfaction >= rating
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>

                  <TextAreaField
                    name="improvements"
                    label="Suggested Improvements"
                    placeholder="What improvements would you like to see?"
                    rows={3}
                  />

                  <div className="mt-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={values.recommendToFriend}
                        onChange={(e) => setFieldValue('recommendToFriend', e.target.checked)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">
                        I would recommend this product to a friend
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Thank you for helping us improve our products
                  </p>

                  <div className="flex space-x-3">
                    <FormButton type="button" variant="secondary">
                      Clear Form
                    </FormButton>
                    <FormButton type="submit">
                      Submit Feedback
                    </FormButton>
                  </div>
                </div>
              </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SurveyForm;