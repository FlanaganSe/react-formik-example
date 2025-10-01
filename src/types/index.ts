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

export interface Address {
  id: string;
  type: 'home' | 'work' | 'billing' | 'shipping';
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isPrimary: boolean;
}

export interface CompanyInfo {
  name: string;
  website: string;
  industry: string;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience: number;
}

export interface Employment {
  status: 'employed' | 'self-employed' | 'unemployed' | 'student';
  company: CompanyInfo;
  position: string;
  startDate: string;
  skills: Skill[];
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  showEmail: boolean;
  showPhone: boolean;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  notifications: NotificationPreferences;
  privacy: PrivacySettings;
}

export interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  dateOfBirth: string;
  addresses: Address[];
  employment: Employment;
  preferences: UserPreferences;
  agreeToTerms: boolean;
  newsletter: boolean;
}

export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  skills: string[];
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  assignedTo: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  type: 'web' | 'mobile' | 'desktop' | 'backend' | 'other';
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  team: TeamMember[];
  milestones: ProjectMilestone[];
  technologies: string[];
  budget: {
    allocated: number;
    spent: number;
    currency: string;
  };
}

export interface WorkExperience {
  id: string;
  companyName: string;
  position: string;
  department: string;
  location: {
    city: string;
    state: string;
    country: string;
    isRemote: boolean;
  };
  duration: {
    startDate: string;
    endDate: string;
    isCurrent: boolean;
  };
  responsibilities: string[];
  achievements: {
    title: string;
    description: string;
    date: string;
  }[];
  technologies: string[];
}

export interface SurveyForm {
  name: string;
  email: string;
  age: number;
  experience: 'beginner' | 'intermediate' | 'advanced';
  technologies: string[];
  feedback: string;
  rating: number;
  projects: Project[];
  workExperience: WorkExperience[];
}

export interface ProductFeedbackForm {
  productName: string;
  category: 'software' | 'hardware' | 'service' | 'other';
  usageFrequency: 'daily' | 'weekly' | 'monthly' | 'rarely';
  satisfaction: number;
  features: string[];
  improvements: string;
  recommendToFriend: boolean;
}