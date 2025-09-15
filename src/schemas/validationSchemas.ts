import * as Yup from 'yup';
import { VALIDATION_MESSAGES, FIELD_LIMITS } from '../constants/validation';

// Custom validation methods  
Yup.addMethod(Yup.string, 'strongPassword', function (message = VALIDATION_MESSAGES.PASSWORD_STRONG) {
  return this.test('strongPassword', message, function (value) {
    if (!value) return true; // Let required handle empty values
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(value);
  });
});

// Common field validations
export const commonValidations = {
  email: Yup.string()
    .email(VALIDATION_MESSAGES.EMAIL_INVALID)
    .required(VALIDATION_MESSAGES.REQUIRED('Email')),
    
  password: Yup.string()
    .min(FIELD_LIMITS.PASSWORD_MIN, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH)
    .required(VALIDATION_MESSAGES.REQUIRED('Password')),
    
  strongPassword: Yup.string()
    .min(FIELD_LIMITS.PASSWORD_MIN, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH)
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
    .required(VALIDATION_MESSAGES.REQUIRED('Password')),
    
  phone: Yup.string()
    .matches(/^\(\d{3}\) \d{3}-\d{4}$/, VALIDATION_MESSAGES.PHONE_FORMAT)
    .required(VALIDATION_MESSAGES.REQUIRED('Phone number')),
    
  name: Yup.string()
    .min(FIELD_LIMITS.NAME_MIN, VALIDATION_MESSAGES.MIN_LENGTH('Name', FIELD_LIMITS.NAME_MIN))
    .max(FIELD_LIMITS.NAME_MAX, VALIDATION_MESSAGES.MAX_LENGTH('Name', FIELD_LIMITS.NAME_MAX))
    .required(VALIDATION_MESSAGES.REQUIRED('Name')),
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

// Product feedback form schema (second form)
export const productFeedbackSchema = Yup.object({
  productName: Yup.string()
    .min(2, 'Product name must be at least 2 characters')
    .max(50, 'Product name must be less than 50 characters')
    .required('Product name is required'),
  category: Yup.string()
    .oneOf(['software', 'hardware', 'service', 'other'], 'Please select a valid category')
    .required('Category is required'),
  usageFrequency: Yup.string()
    .oneOf(['daily', 'weekly', 'monthly', 'rarely'], 'Please select usage frequency')
    .required('Usage frequency is required'),
  satisfaction: Yup.number()
    .min(1, 'Satisfaction rating must be between 1 and 10')
    .max(10, 'Satisfaction rating must be between 1 and 10')
    .required('Satisfaction rating is required'),
  features: Yup.array()
    .of(Yup.string())
    .min(1, 'Please select at least one feature')
    .required('Features are required'),
  improvements: Yup.string()
    .min(10, 'Please provide at least 10 characters for improvements')
    .max(300, 'Improvements must be less than 300 characters')
    .required('Improvement suggestions are required'),
  recommendToFriend: Yup.boolean().required('Please indicate if you would recommend this product'),
});


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