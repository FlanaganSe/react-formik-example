import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { FormField, TextAreaField, SelectField, FormButton } from '../ui';
import { surveySchema } from '../../schemas/validationSchemas';
import { apiService } from '../../services/apiService';
import { showToast } from '../notifications';
import type { SurveyForm as SurveyFormData } from '../../types';

const SurveyForm: React.FC = () => {

  const initialValues: SurveyFormData = {
    name: '',
    email: '',
    age: 0,
    experience: 'beginner' as const,
    technologies: [],
    feedback: '',
    rating: 0,
  };

  const experienceOptions = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (1-3 years)' },
    { value: 'advanced', label: 'Advanced (3+ years)' },
  ];

  const technologyOptions = [
    'React', 'Vue', 'Angular', 'Svelte',
    'JavaScript', 'TypeScript', 'Python', 'Java',
    'Node.js', 'Express', 'Next.js', 'Nuxt.js',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis'
  ];

  const handleSubmit = async (values: SurveyFormData, { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }) => {
    try {
      const toastId = showToast.loading('Submitting survey...');
      
      const response = await apiService.submitSurvey(values);
      
      showToast.dismiss(toastId);
      
      if (response.success) {
        showToast.formSuccess('Survey', response.message);
        resetForm();
      } else {
        showToast.formError('Survey', response.message);
      }
    } catch {
      showToast.networkError();
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Developer Experience Survey</h2>
      <p className="text-gray-600 mb-6">
        Help us understand your development experience and preferences.
      </p>
      
      <Formik
        initialValues={initialValues}
        validationSchema={surveySchema}
        onSubmit={handleSubmit}
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
                    Overall Rating
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
  );
};

export default SurveyForm;