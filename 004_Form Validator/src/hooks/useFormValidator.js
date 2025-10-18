import { useState, useCallback } from 'react';
import { validators, jqueryValidators } from '../utils/validators';

export const useFormValidator = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validate single field
  const validateField = useCallback((name, value) => {
    let error = null;

    switch (name) {
      case 'email':
        error = validators.email(value);
        break;
      case 'password':
        error = validators.password(value);
        break;
      case 'confirmPassword':
        error = validators.confirmPassword(value, formData);
        break;
      case 'phone':
        error = validators.phone(value);
        break;
      default:
        if (name.includes('required')) {
          error = validators.required(value, name.replace('required', ''));
        }
        break;
    }

    return error;
  }, [formData]);

  // Handle field change with jQuery enhancement
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // jQuery real-time validation
    if (window.$ && touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));

      // jQuery UI enhancement
      const $field = window.$(e.target);
      if (error) {
        $field.addClass('error').removeClass('success');
      } else {
        $field.addClass('success').removeClass('error');
      }
    }
  }, [touched, validateField]);

  // Handle blur with validation
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    // jQuery enhancement on blur
    if (window.$) {
      const $field = window.$(e.target);
      if (error) {
        $field.addClass('error').removeClass('success');
      } else {
        $field.addClass('success').removeClass('error');
      }
    }
  }, [validateField]);

  // Validate entire form
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    
    // jQuery form validation enhancement
    if (window.$ && !isValid) {
      window.$('.form-field').each(function() {
        const fieldName = window.$(this).attr('name');
        if (newErrors[fieldName]) {
          window.$(this).addClass('error').removeClass('success');
        }
      });
    }

    return isValid;
  }, [formData, validateField]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(initialState);
    setErrors({});
    setTouched({});
    
    // jQuery reset
    if (window.$) {
      window.$('.form-field').removeClass('error success');
    }
  }, [initialState]);

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setFormData
  };
};