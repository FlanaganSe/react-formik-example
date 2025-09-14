import type { FormikHelpers } from 'formik';
import { showToast } from '../components/notifications';
import type { ApiResponse } from '../types';

export const useFormSubmission = <T>(
  submitFn: (values: T) => Promise<ApiResponse>,
  formName: string
) => {
  return async (values: T, helpers: FormikHelpers<T>) => {
    try {
      const toastId = showToast.loading(`Submitting ${formName}...`);
      
      const response = await submitFn(values);
      
      showToast.dismiss(toastId);
      
      if (response.success) {
        showToast.formSuccess(formName, response.message);
        helpers.resetForm();
      } else {
        showToast.formError(formName, response.message);
        
        if (response.errors) {
          response.errors.forEach(error => {
            if (error.type === 'error') {
              helpers.setFieldError(error.field, error.message);
            }
          });
        }
      }
    } catch {
      showToast.networkError();
    } finally {
      helpers.setSubmitting(false);
    }
  };
};