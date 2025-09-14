import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        className: '',
        duration: 4000,
        style: {
          background: '#ffffff',
          color: '#374151',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        success: {
          duration: 3000,
          style: {
            background: '#f0f9ff',
            border: '1px solid #0ea5e9',
          },
          iconTheme: {
            primary: '#0ea5e9',
            secondary: '#ffffff',
          },
        },
        error: {
          duration: 5000,
          style: {
            background: '#fef2f2',
            border: '1px solid #ef4444',
          },
          iconTheme: {
            primary: '#ef4444',
            secondary: '#ffffff',
          },
        },
        loading: {
          duration: Infinity,
          style: {
            background: '#f9fafb',
            border: '1px solid #6b7280',
          },
        },
      }}
    />
  );
};

export default ToastProvider;