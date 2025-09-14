# Formik Test Project

A React application for testing and demonstrating Formik form management with comprehensive validation, error handling, and modern UX patterns.

## Tech Stack

- **React 19** with TypeScript
- **Vite** - Build tool and dev server
- **Formik 2.4.6** - Form state management
- **Yup 1.7.0** - Schema validation
- **Tailwind CSS** - Styling
- **React Hot Toast** - Notifications
- **Axios** - HTTP client

## Features

- **Multiple Form Examples**: Registration, login, contact, and survey forms
- **Comprehensive Validation**: Field-level and form-level validation with Yup schemas
- **Error Handling**: Validation errors, warnings, and API error responses
- **Modern UI**: Clean interface with Tailwind CSS and Headless UI components
- **Mock API Integration**: Simulated endpoints with realistic delays and error scenarios

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── forms/          # Formik form implementations
│   ├── ui/             # Reusable UI components
│   └── notifications/  # Toast notification system
├── schemas/            # Yup validation schemas
├── services/           # Mock API services
├── types/              # TypeScript definitions
└── hooks/              # Custom form hooks
```

## Use Cases

- Testing Formik integration patterns
- Validating form UX approaches
- Chrome extension form development
- Form validation strategy evaluation
