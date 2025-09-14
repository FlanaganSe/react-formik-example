import React, { useState } from 'react';

interface NavigationProps {
  activeForm: string;
  onFormSelect: (formName: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeForm, onFormSelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const forms = [
    { id: 'login', name: 'Login', description: 'Simple authentication form' },
    { id: 'registration', name: 'Registration', description: 'Complete signup with validation' },
    { id: 'contact', name: 'Contact', description: 'Contact form with file upload' },
    { id: 'survey', name: 'Survey', description: 'Complex form with warnings' },
  ];

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              Formik Demo
            </h1>
            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md">
              Proof of Concept
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {forms.map((form) => (
              <button
                key={form.id}
                onClick={() => onFormSelect(form.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeForm === form.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                {form.name}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {forms.map((form) => (
                <button
                  key={form.id}
                  onClick={() => {
                    onFormSelect(form.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeForm === form.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-medium">{form.name}</div>
                  <div className="text-xs text-gray-400">{form.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;