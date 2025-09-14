export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
}

export interface ValidationError {
  field: string;
  message: string;
  type: 'error';
}

export interface ValidationWarning {
  field: string;
  message: string;
  type: 'warning';
}

export type ValidationMessage = ValidationError | ValidationWarning;

export interface FormState<T = FormValues> {
  isSubmitting: boolean;
  submitAttempted: boolean;
  errors: Partial<Record<keyof T, string>>;
  warnings: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  values: T;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: ValidationMessage[];
}

export type FormValues = ContactForm | RegistrationForm | LoginForm | SurveyForm;

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  attachFile?: File;
}

export interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  agreeToTerms: boolean;
  newsletter: boolean;
}

export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SurveyForm {
  name: string;
  email: string;
  age: number;
  experience: 'beginner' | 'intermediate' | 'advanced';
  technologies: string[];
  feedback: string;
  rating: number;
}