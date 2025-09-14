export const VALIDATION_MESSAGES = {
  REQUIRED: (field: string) => `${field} is required`,
  MIN_LENGTH: (field: string, min: number) => `${field} must be at least ${min} characters`,
  MAX_LENGTH: (field: string, max: number) => `${field} must be less than ${max} characters`,
  EMAIL_INVALID: 'Please enter a valid email address',
  PASSWORDS_MISMATCH: 'Passwords must match',
  TERMS_REQUIRED: 'You must agree to the terms and conditions',
  PHONE_FORMAT: 'Phone must be in format (123) 456-7890',
  PASSWORD_STRONG: 'Password must contain uppercase, lowercase, number, and special character',
  PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters',
  RATING_RANGE: 'Rating must be between 1 and 5',
  AGE_MIN: 'You must be at least 13 years old',
  AGE_MAX: 'Please enter a valid age',
  SELECT_OPTION: (field: string) => `Please select your ${field}`,
  MIN_SELECTIONS: (field: string, min: number) => `Please select at least ${min} ${field}`,
} as const;

export const VALIDATION_PATTERNS = {
  PHONE: /^\(\d{3}\) \d{3}-\d{4}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
} as const;

export const FIELD_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 50,
  PASSWORD_MIN: 8,
  SUBJECT_MIN: 5,
  SUBJECT_MAX: 100,
  MESSAGE_MIN: 10,
  MESSAGE_MAX: 1000,
  FEEDBACK_MIN: 20,
  FEEDBACK_MAX: 500,
  AGE_MIN: 13,
  AGE_MAX: 120,
  RATING_MIN: 1,
  RATING_MAX: 5,
} as const;