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

// Address schema
const addressSchema = Yup.object({
  id: Yup.string().required(),
  type: Yup.string()
    .oneOf(['home', 'work', 'billing', 'shipping'], 'Please select a valid address type')
    .required('Address type is required'),
  street: Yup.string()
    .min(5, 'Street address must be at least 5 characters')
    .required('Street address is required'),
  apartment: Yup.string(),
  city: Yup.string()
    .min(2, 'City must be at least 2 characters')
    .required('City is required'),
  state: Yup.string()
    .length(2, 'State must be 2 characters')
    .required('State is required'),
  zipCode: Yup.string()
    .matches(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format')
    .required('ZIP code is required'),
  country: Yup.string()
    .required('Country is required'),
  isPrimary: Yup.boolean().required(),
});

// Skill schema
const skillSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Skill name must be at least 2 characters')
    .required('Skill name is required'),
  level: Yup.string()
    .oneOf(['beginner', 'intermediate', 'advanced', 'expert'], 'Please select a valid skill level')
    .required('Skill level is required'),
  yearsOfExperience: Yup.number()
    .min(0, 'Years of experience must be 0 or greater')
    .max(50, 'Years of experience must be less than 50')
    .required('Years of experience is required'),
});

// Company info schema
const companyInfoSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Company name must be at least 2 characters')
    .required('Company name is required'),
  website: Yup.string()
    .url('Invalid URL format')
    .required('Website is required'),
  industry: Yup.string()
    .min(2, 'Industry must be at least 2 characters')
    .required('Industry is required'),
  size: Yup.string()
    .oneOf(['startup', 'small', 'medium', 'large', 'enterprise'], 'Please select a valid company size')
    .required('Company size is required'),
});

// Employment schema
const employmentSchema = Yup.object({
  status: Yup.string()
    .oneOf(['employed', 'self-employed', 'unemployed', 'student'], 'Please select a valid employment status')
    .required('Employment status is required'),
  company: companyInfoSchema,
  position: Yup.string()
    .min(2, 'Position must be at least 2 characters')
    .required('Position is required'),
  startDate: Yup.string()
    .required('Start date is required'),
  skills: Yup.array()
    .of(skillSchema)
    .min(1, 'Please add at least one skill')
    .required('Skills are required'),
});

// User preferences schema
const userPreferencesSchema = Yup.object({
  theme: Yup.string()
    .oneOf(['light', 'dark', 'auto'], 'Please select a valid theme')
    .required('Theme is required'),
  language: Yup.string()
    .required('Language is required'),
  timezone: Yup.string()
    .required('Timezone is required'),
  notifications: Yup.object({
    email: Yup.boolean().required(),
    sms: Yup.boolean().required(),
    push: Yup.boolean().required(),
  }).required(),
  privacy: Yup.object({
    profileVisibility: Yup.string()
      .oneOf(['public', 'private', 'friends'], 'Please select a valid visibility option')
      .required('Profile visibility is required'),
    showEmail: Yup.boolean().required(),
    showPhone: Yup.boolean().required(),
  }).required(),
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
  dateOfBirth: Yup.string()
    .required('Date of birth is required'),
  addresses: Yup.array()
    .of(addressSchema)
    .min(1, 'Please add at least one address')
    .required('Addresses are required'),
  employment: employmentSchema,
  preferences: userPreferencesSchema,
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

// Team member schema
const teamMemberSchema = Yup.object({
  id: Yup.string().required(),
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  role: Yup.string()
    .min(2, 'Role must be at least 2 characters')
    .required('Role is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  skills: Yup.array()
    .of(Yup.string())
    .min(1, 'Please add at least one skill')
    .required('Skills are required'),
});

// Project milestone schema
const projectMilestoneSchema = Yup.object({
  id: Yup.string().required(),
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .required('Title is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  dueDate: Yup.string()
    .required('Due date is required'),
  status: Yup.string()
    .oneOf(['pending', 'in-progress', 'completed', 'delayed'], 'Please select a valid status')
    .required('Status is required'),
  assignedTo: Yup.array()
    .of(Yup.string())
    .min(1, 'Please assign at least one team member')
    .required('Assigned members are required'),
});

// Project schema
const projectSchema = Yup.object({
  id: Yup.string().required(),
  name: Yup.string()
    .min(3, 'Project name must be at least 3 characters')
    .required('Project name is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  type: Yup.string()
    .oneOf(['web', 'mobile', 'desktop', 'backend', 'other'], 'Please select a valid project type')
    .required('Project type is required'),
  startDate: Yup.string()
    .required('Start date is required'),
  endDate: Yup.string()
    .required('End date is required'),
  status: Yup.string()
    .oneOf(['planning', 'active', 'on-hold', 'completed'], 'Please select a valid status')
    .required('Status is required'),
  team: Yup.array()
    .of(teamMemberSchema)
    .min(1, 'Please add at least one team member')
    .required('Team members are required'),
  milestones: Yup.array()
    .of(projectMilestoneSchema)
    .min(1, 'Please add at least one milestone')
    .required('Milestones are required'),
  technologies: Yup.array()
    .of(Yup.string())
    .min(1, 'Please add at least one technology')
    .required('Technologies are required'),
  budget: Yup.object({
    allocated: Yup.number()
      .min(0, 'Allocated budget must be 0 or greater')
      .required('Allocated budget is required'),
    spent: Yup.number()
      .min(0, 'Spent budget must be 0 or greater')
      .required('Spent budget is required'),
    currency: Yup.string()
      .required('Currency is required'),
  }).required(),
});

// Work experience schema
const workExperienceSchema = Yup.object({
  id: Yup.string().required(),
  companyName: Yup.string()
    .min(2, 'Company name must be at least 2 characters')
    .required('Company name is required'),
  position: Yup.string()
    .min(2, 'Position must be at least 2 characters')
    .required('Position is required'),
  department: Yup.string()
    .min(2, 'Department must be at least 2 characters')
    .required('Department is required'),
  location: Yup.object({
    city: Yup.string()
      .min(2, 'City must be at least 2 characters')
      .required('City is required'),
    state: Yup.string()
      .min(2, 'State must be at least 2 characters')
      .required('State is required'),
    country: Yup.string()
      .required('Country is required'),
    isRemote: Yup.boolean().required(),
  }).required(),
  duration: Yup.object({
    startDate: Yup.string()
      .required('Start date is required'),
    endDate: Yup.string()
      .required('End date is required'),
    isCurrent: Yup.boolean().required(),
  }).required(),
  responsibilities: Yup.array()
    .of(Yup.string())
    .min(1, 'Please add at least one responsibility')
    .required('Responsibilities are required'),
  achievements: Yup.array()
    .of(Yup.object({
      title: Yup.string()
        .min(3, 'Title must be at least 3 characters')
        .required('Title is required'),
      description: Yup.string()
        .min(10, 'Description must be at least 10 characters')
        .required('Description is required'),
      date: Yup.string()
        .required('Date is required'),
    }))
    .min(1, 'Please add at least one achievement')
    .required('Achievements are required'),
  technologies: Yup.array()
    .of(Yup.string())
    .min(1, 'Please add at least one technology')
    .required('Technologies are required'),
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
  projects: Yup.array()
    .of(projectSchema)
    .min(1, 'Please add at least one project')
    .required('Projects are required'),
  workExperience: Yup.array()
    .of(workExperienceSchema)
    .min(1, 'Please add at least one work experience')
    .required('Work experience is required'),
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