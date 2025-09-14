import toast from 'react-hot-toast';

export const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  loading: (message: string) => toast.loading(message),
  dismiss: (toastId?: string) => toast.dismiss(toastId),
  
  promise: <T,>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => toast.promise(promise, { loading, success, error }),
  
  formSuccess: (formName: string, customMessage?: string) => 
    toast.success(customMessage || `${formName} submitted successfully!`),
    
  formError: (formName: string, customMessage?: string) => 
    toast.error(customMessage || `Failed to submit ${formName}. Please try again.`),
    
  validationError: (message: string = 'Please fix the errors below') => 
    toast.error(message),
    
  networkError: () => 
    toast.error('Network error. Please check your connection and try again.'),
};

export default showToast;