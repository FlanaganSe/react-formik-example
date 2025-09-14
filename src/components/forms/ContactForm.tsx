import React from 'react';
import { Formik, Form } from 'formik';
import { FormField, TextAreaField, FormButton } from '../ui';
import { contactSchema } from '../../schemas/validationSchemas';
import { apiService } from '../../services/apiService';
import { showToast } from '../notifications';
import { formatPhone } from '../../utils';
import type { ContactForm as ContactFormData } from '../../types';

const ContactForm: React.FC = () => {

  const initialValues: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  };

  const handleSubmit = async (values: ContactFormData, { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }) => {
    try {
      const toastId = showToast.loading('Sending your message...');
      
      const response = await apiService.submitContact(values);
      
      showToast.dismiss(toastId);
      
      if (response.success) {
        showToast.formSuccess('Contact Form', response.message);
        resetForm();
      } else {
        showToast.formError('Contact Form', response.message);
      }
    } catch {
      showToast.networkError();
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Us</h2>
      <p className="text-gray-600 mb-6">
        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </p>
      
      <Formik
        initialValues={initialValues}
        validationSchema={contactSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ setFieldValue }) => (
            <Form className="space-y-4">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  name="phone"
                  label="Phone Number (Optional)"
                  placeholder="(123) 456-7890"
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value);
                    setFieldValue('phone', formatted);
                  }}
                />
                
                <FormField
                  name="subject"
                  label="Subject"
                  placeholder="What's this about?"
                />
              </div>
              
              <TextAreaField
                name="message"
                label="Message"
                placeholder="Tell us more about your inquiry..."
                rows={6}
              />
              
              <div className="flex justify-between items-center pt-4">
                <p className="text-sm text-gray-500">
                  We typically respond within 24 hours
                </p>
                
                <div className="flex space-x-3">
                  <FormButton type="button" variant="secondary">
                    Clear
                  </FormButton>
                  <FormButton type="submit">
                    Send Message
                  </FormButton>
                </div>
              </div>
            </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;