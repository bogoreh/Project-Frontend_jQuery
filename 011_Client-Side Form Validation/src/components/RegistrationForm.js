import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import ErrorMessage from './ErrorMessage';
import { validateField, validateForm } from '../utils/validation';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Initialize jQuery event handlers
    const initializeJQueryHandlers = () => {
      $('.registration-form').on('submit', handleJQuerySubmit);
      
      // Add blur handlers for real-time validation
      $('.form-control').on('blur', function() {
        const fieldName = $(this).attr('name');
        const value = $(this).val();
        
        if (fieldName) {
          handleFieldBlur(fieldName, value);
        }
      });
    };

    initializeJQueryHandlers();

    // Cleanup
    return () => {
      $('.registration-form').off('submit');
      $('.form-control').off('blur');
    };
  }, []);

  const handleJQuerySubmit = (e) => {
    e.preventDefault();
    
    // Use jQuery to get form data
    const jqFormData = {};
    $('.registration-form .form-control').each(function() {
      const name = $(this).attr('name');
      const value = $(this).val();
      if (name) {
        jqFormData[name] = value;
      }
    });

    setIsSubmitting(true);
    
    // Validate using our validation utility
    const { isValid, errors: validationErrors } = validateForm(jqFormData);
    
    // Additional validation for password confirmation
    if (jqFormData.password !== jqFormData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    if (!isValid || jqFormData.password !== jqFormData.confirmPassword) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      
      // Add error classes using jQuery
      Object.keys(validationErrors).forEach(fieldName => {
        $(`[name="${fieldName}"]`).addClass('error');
      });
      
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', jqFormData);
      setSubmitSuccess(true);
      setIsSubmitting(false);
      
      // Reset form using jQuery
      $('.registration-form')[0].reset();
      $('.form-control').removeClass('error success');
      setErrors({});
      setTouched({});
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1000);
  };

  const handleFieldBlur = (fieldName, value) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    let error = '';
    
    if (fieldName === 'confirmPassword') {
      if (value !== formData.password) {
        error = 'Passwords do not match';
      }
    } else {
      error = validateField(fieldName, value, true);
    }
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));

    // Update classes using jQuery
    const $field = $(`[name="${fieldName}"]`);
    if (error) {
      $field.addClass('error').removeClass('success');
    } else if (value.trim()) {
      $field.addClass('success').removeClass('error');
    } else {
      $field.removeClass('error success');
    }
  };

  const handleReactChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReactBlur = (e) => {
    const { name, value } = e.target;
    handleFieldBlur(name, value);
  };

  return (
    <form className="registration-form" noValidate>
      <div className="form-group">
        <label htmlFor="fullName">Full Name *</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          className="form-control"
          placeholder="Enter your full name"
          onChange={handleReactChange}
          onBlur={handleReactBlur}
        />
        <ErrorMessage message={errors.fullName} />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          placeholder="Enter your email"
          onChange={handleReactChange}
          onBlur={handleReactBlur}
        />
        <ErrorMessage message={errors.email} />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="form-control"
          placeholder="Enter your phone number"
          onChange={handleReactChange}
          onBlur={handleReactBlur}
        />
        <ErrorMessage message={errors.phone} />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password *</label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-control"
          placeholder="Enter your password"
          onChange={handleReactChange}
          onBlur={handleReactBlur}
        />
        <ErrorMessage message={errors.password} />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password *</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="form-control"
          placeholder="Confirm your password"
          onChange={handleReactChange}
          onBlur={handleReactBlur}
        />
        <ErrorMessage message={errors.confirmPassword} />
      </div>

      <button 
        type="submit" 
        className="btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>

      {submitSuccess && (
        <div className="success-message">
          Registration successful! Welcome aboard!
        </div>
      )}
    </form>
  );
};

export default RegistrationForm;