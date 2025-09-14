import { useState } from 'react';
import { ToastProvider } from './components/notifications';
import { Navigation, Layout } from './components/ui';
import { LoginForm, RegistrationForm, ContactForm, SurveyForm } from './components/forms';

function App() {
  const [activeForm, setActiveForm] = useState('login');

  const renderActiveForm = () => {
    switch (activeForm) {
      case 'login':
        return <LoginForm />;
      case 'registration':
        return <RegistrationForm />;
      case 'contact':
        return <ContactForm />;
      case 'survey':
        return <SurveyForm />;
      default:
        return <LoginForm />;
    }
  };

  const getFormTitle = () => {
    switch (activeForm) {
      case 'login':
        return 'Login Form';
      case 'registration':
        return 'Registration Form';
      case 'contact':
        return 'Contact Form';
      case 'survey':
        return 'Developer Survey Form';
      default:
        return 'Form Example';
    }
  };

  const getFormDescription = () => {
    switch (activeForm) {
      case 'login':
        return 'Simple authentication form with validation and error handling. Demonstrates basic Formik usage with Yup validation.';
      case 'registration':
        return 'Complete user registration with password strength validation, terms acceptance, and formatted phone input. Shows complex form validation patterns.';
      case 'contact':
        return 'Contact form with optional fields and file upload capability. Includes both required and optional field validation.';
      case 'survey':
        return 'Advanced form with warnings, dynamic field arrays, and complex validation logic. Demonstrates the difference between blocking errors and informational warnings.';
      default:
        return 'Interactive form examples demonstrating Formik best practices.';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeForm={activeForm} onFormSelect={setActiveForm} />
      
      <Layout title={getFormTitle()} description={getFormDescription()}>
        <div className="flex justify-center">
          {renderActiveForm()}
        </div>
      </Layout>
      
      <ToastProvider />
    </div>
  );
}

export default App;