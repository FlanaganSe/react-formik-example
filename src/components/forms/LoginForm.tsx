import React from 'react';
import { Formik, Form } from 'formik';
import { FormField, CheckboxField, FormButton } from '../ui';
import { loginSchema } from '../../schemas/validationSchemas';
import { apiService } from '../../services/apiService';
import { showToast } from '../notifications';
import type { LoginForm as LoginFormData } from '../../types';

const LoginForm: React.FC = () => {
  const initialValues: LoginFormData = {
    email: '',
    password: '',
    rememberMe: false,
  };

  const handleSubmit = async (values: LoginFormData, { setSubmitting, setFieldError }: { setSubmitting: (isSubmitting: boolean) => void; setFieldError: (field: string, message: string) => void }) => {
    try {
      const toastId = showToast.loading('Signing you in...');
      
      const response = await apiService.login(values);
      
      showToast.dismiss(toastId);
      
      if (response.success) {
        showToast.formSuccess('Login', `Welcome back, ${response.data?.name}!`);
        // In a real app, you would redirect or update auth state here
      } else {
        showToast.formError('Login', response.message);
        
        if (response.errors) {
          response.errors.forEach(error => {
            if (error.type === 'error') {
              setFieldError(error.field, error.message);
            }
          });
        }
      }
    } catch {
      showToast.networkError();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        <Form className="space-y-4">
          <FormField
            name="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
          />
          
          <FormField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          
          <div className="flex items-center justify-between">
            <CheckboxField
              name="rememberMe"
              label="Remember me"
            />
            
            <button type="button" className="text-sm text-blue-600 hover:text-blue-500">
              Forgot password?
            </button>
          </div>
          
          <FormButton type="submit" className="w-full">
            Sign In
          </FormButton>
          
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button type="button" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign up
            </button>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800 font-medium">Demo Credentials:</p>
            <p className="text-xs text-blue-700 mt-1">
              Email: admin@example.com | Password: admin123<br/>
              Email: user@example.com | Password: password123
            </p>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;