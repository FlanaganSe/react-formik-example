import type { ApiResponse, User, ContactForm, RegistrationForm, LoginForm, SurveyForm, ProductFeedbackForm } from '../types';
import { delay, generateId } from '../utils';

// Simulate network conditions
const NETWORK_DELAY = 1000;
const ERROR_RATE = 0.1; // 10% chance of random errors

class ApiService {
  private users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user'
    },
    {
      id: '2',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin'
    }
  ];

  private shouldSimulateError(): boolean {
    return Math.random() < ERROR_RATE;
  }

  private async simulateNetworkDelay(): Promise<void> {
    await delay(NETWORK_DELAY + Math.random() * 500);
  }

  // Authentication endpoints
  async login(credentials: LoginForm): Promise<ApiResponse<User>> {
    await this.simulateNetworkDelay();
    
    if (this.shouldSimulateError()) {
      return {
        success: false,
        message: 'Network error occurred. Please try again.',
      };
    }

    // Simulate credential validation
    if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
      return {
        success: true,
        data: this.users.find(u => u.email === credentials.email),
        message: 'Login successful'
      };
    }

    if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
      return {
        success: true,
        data: {
          id: generateId(),
          name: 'Demo User',
          email: credentials.email,
          role: 'user'
        },
        message: 'Login successful'
      };
    }

    return {
      success: false,
      message: 'Invalid email or password',
      errors: [
        { field: 'email', message: 'Invalid credentials', type: 'error' },
        { field: 'password', message: 'Invalid credentials', type: 'error' }
      ]
    };
  }

  async register(userData: RegistrationForm): Promise<ApiResponse<User>> {
    await this.simulateNetworkDelay();
    
    if (this.shouldSimulateError()) {
      return {
        success: false,
        message: 'Registration failed due to server error. Please try again.',
      };
    }

    // Check if email already exists
    const existingUser = this.users.find(u => u.email === userData.email);
    if (existingUser) {
      return {
        success: false,
        message: 'Registration failed',
        errors: [
          { field: 'email', message: 'Email address is already registered', type: 'error' }
        ]
      };
    }

    // Create new user
    const newUser: User = {
      id: generateId(),
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      phone: userData.phone,
      role: 'user'
    };

    this.users.push(newUser);

    return {
      success: true,
      data: newUser,
      message: 'Registration successful! Welcome aboard!'
    };
  }

  // Contact form endpoint
  async submitContact(contactData: ContactForm): Promise<ApiResponse> {
    await this.simulateNetworkDelay();
    
    if (this.shouldSimulateError()) {
      return {
        success: false,
        message: 'Failed to send message. Please try again later.',
      };
    }

    // Simulate spam detection
    if (contactData.message.toLowerCase().includes('spam') || 
        contactData.message.toLowerCase().includes('advertisement')) {
      return {
        success: false,
        message: 'Message appears to be spam',
        errors: [
          { field: 'message', message: 'Message content not allowed', type: 'error' }
        ]
      };
    }

    // Simulate successful submission
    console.log('Contact form submitted:', contactData);
    
    return {
      success: true,
      message: `Thank you ${contactData.name}! We'll get back to you within 24 hours.`
    };
  }

  // Survey form endpoint
  async submitSurvey(surveyData: SurveyForm): Promise<ApiResponse> {
    await this.simulateNetworkDelay();
    
    if (this.shouldSimulateError()) {
      return {
        success: false,
        message: 'Survey submission failed. Please try again.',
      };
    }

    console.log('Survey submitted:', surveyData);
    
    return {
      success: true,
      message: 'Thank you for your feedback! Your response has been recorded.'
    };
  }

  // Product feedback form endpoint
  async submitProductFeedback(feedbackData: ProductFeedbackForm): Promise<ApiResponse> {
    await this.simulateNetworkDelay();
    
    if (this.shouldSimulateError()) {
      return {
        success: false,
        message: 'Product feedback submission failed. Please try again.',
      };
    }

    console.log('Product feedback submitted:', feedbackData);
    
    return {
      success: true,
      message: 'Thank you for your product feedback! We appreciate your input.'
    };
  }

  // Email validation endpoint
  async validateEmail(email: string): Promise<ApiResponse<{ available: boolean }>> {
    await delay(300); // Shorter delay for real-time validation
    
    const existingEmails = ['admin@example.com', 'user@example.com', 'test@test.com'];
    const isAvailable = !existingEmails.includes(email.toLowerCase());
    
    return {
      success: true,
      data: { available: isAvailable },
      message: isAvailable ? 'Email is available' : 'Email is already registered'
    };
  }

  // File upload simulation
  async uploadFile(file: File): Promise<ApiResponse<{ url: string; id: string }>> {
    await this.simulateNetworkDelay();
    
    // Simulate file size limit (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return {
        success: false,
        message: 'File size exceeds 5MB limit',
        errors: [
          { field: 'attachFile', message: 'File too large', type: 'error' }
        ]
      };
    }

    // Simulate file type restrictions
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        message: 'File type not allowed',
        errors: [
          { field: 'attachFile', message: 'Only JPEG, PNG, PDF, and TXT files are allowed', type: 'error' }
        ]
      };
    }

    return {
      success: true,
      data: {
        url: `https://example.com/uploads/${generateId()}-${file.name}`,
        id: generateId()
      },
      message: 'File uploaded successfully'
    };
  }

  // Health check endpoint
  async healthCheck(): Promise<ApiResponse> {
    await delay(100);
    
    return {
      success: true,
      message: 'API is healthy'
    };
  }
}

export const apiService = new ApiService();
export default apiService;