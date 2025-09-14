import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="max-w-7xl mx-auto mb-8">
            {title && (
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            )}
            {description && (
              <p className="text-gray-600 max-w-3xl">{description}</p>
            )}
          </div>
        )}
        
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
        
        <footer className="mt-16 border-t border-gray-200 pt-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">
                🔍 Formik State Inspector
              </h3>
              <p className="text-xs text-blue-700">
                This proof of concept is designed to work with a Chrome extension that helps developers 
                inspect and understand Formik's internal state. All forms follow best practices and 
                maintain proper state management for easy debugging and analysis.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-1">Validation</h4>
                <p className="text-gray-600">Yup schemas with errors & warnings</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-1">State Management</h4>
                <p className="text-gray-600">Proper Formik context & hooks</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-1">Error Handling</h4>
                <p className="text-gray-600">Field, form & server error states</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-1">UX Patterns</h4>
                <p className="text-gray-600">Loading states & toast notifications</p>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              Built with React, Formik, Yup, Tailwind CSS, and TypeScript
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Layout;