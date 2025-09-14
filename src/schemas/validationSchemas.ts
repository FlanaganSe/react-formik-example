import * as Yup from 'yup';
import { isStrongPassword } from '../utils';

// Custom validation methods
Yup.addMethod(Yup.string, 'strongPassword', function (message = 'Password is not strong enough') {
  return this.test('strongPassword', message, function (value) {
    if (!value) return true; // Let required handle empty values
    return isStrongPassword(value);
  });
});

// Common field validations
export const commonValidations = {
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
    
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
    
  strongPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
    .required('Password is required'),
    
  phone: Yup.string()
    .matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'Phone must be in format (123) 456-7890')
    .required('Phone number is required'),
    
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
};

// Login form schema
export const loginSchema = Yup.object({
  email: commonValidations.email,
  password: commonValidations.password,
  rememberMe: Yup.boolean(),
});

// Registration form schema
export const registrationSchema = Yup.object({
  firstName: commonValidations.name,
  lastName: commonValidations.name,
  email: commonValidations.email,
  password: commonValidations.strongPassword,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  phone: commonValidations.phone,
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must agree to the terms and conditions')
    .required('You must agree to the terms and conditions'),
  newsletter: Yup.boolean(),
});

// Contact form schema
export const contactSchema = Yup.object({
  name: commonValidations.name,
  email: commonValidations.email,
  phone: Yup.string()
    .matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'Phone must be in format (123) 456-7890'),
  subject: Yup.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters')
    .required('Subject is required'),
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .required('Message is required'),
});

// Survey form schema with warnings
export const surveySchema = Yup.object({
  name: commonValidations.name,
  email: commonValidations.email,
  age: Yup.number()
    .min(13, 'You must be at least 13 years old')
    .max(120, 'Please enter a valid age')
    .required('Age is required'),
  experience: Yup.string()
    .oneOf(['beginner', 'intermediate', 'advanced'], 'Please select your experience level')
    .required('Experience level is required'),
  technologies: Yup.array()
    .of(Yup.string())
    .min(1, 'Please select at least one technology')
    .required('Technologies are required'),
  feedback: Yup.string()
    .min(20, 'Please provide at least 20 characters of feedback')
    .max(500, 'Feedback must be less than 500 characters')
    .required('Feedback is required'),
  rating: Yup.number()
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5')
    .required('Rating is required'),
});

// Validation warnings (non-blocking)
export const getValidationWarnings = (values: any, formType: string): Record<string, string> => {
  const warnings: Record<string, string> = {};
  
  switch (formType) {
    case 'registration':
      if (values.password && values.password.length >= 8) {
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(values.password)) {
          warnings.password = 'Consider using uppercase, lowercase, numbers, and special characters for better security';
        }
      }
      if (values.email && !values.email.includes('.com') && !values.email.includes('.org')) {
        warnings.email = 'Consider using a common email domain for better deliverability';
      }
      break;
      
    case 'contact':
      if (values.phone && !values.phone) {
        warnings.phone = 'Providing a phone number helps us respond faster';
      }
      if (values.subject && values.subject.length < 10) {
        warnings.subject = 'A more descriptive subject helps us categorize your request';
      }
      break;
      
    case 'survey':
      if (values.age && (values.age < 18 || values.age > 65)) {
        warnings.age = 'This survey is primarily designed for working professionals aged 18-65';
      }
      if (values.experience === 'beginner' && values.technologies && values.technologies.length > 5) {
        warnings.technologies = 'As a beginner, you might want to focus on fewer technologies initially';
      }
      if (values.rating && values.rating < 3) {
        warnings.rating = 'We\'d love to know how we can improve - please share specific feedback';
      }
      break;
  }
  
  return warnings;
};

// Async validation function (simulates server-side validation)
export const asyncValidateEmail = async (email: string): Promise<string | undefined> => {
  if (!email) return undefined;
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate checking if email is already taken
  const takenEmails = ['admin@example.com', 'test@test.com', 'user@demo.com'];
  if (takenEmails.includes(email.toLowerCase())) {
    return 'This email address is already registered';
  }
  
  return undefined;
};