import React, { useEffect } from 'react';
import { useFormValidator } from '../hooks/useFormValidator';
import InputField from './InputField';
import PasswordStrength from './PasswordStrength';

const FormValidator = () => {
  const initialFormState = {
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    fullName: ''
  };

  const {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm
  } = useFormValidator(initialFormState);

  // jQuery enhancements on component mount
  useEffect(() => {
    if (window.$) {
      // Add smooth animations
      window.$('.form-field').on('focus', function() {
        window.$(this).parent().addClass('focused');
      });

      window.$('.form-field').on('blur', function() {
        window.$(this).parent().removeClass('focused');
      });

      // Form submission animation
      window.$('form').on('submit', function(e) {
        e.preventDefault();
        const $form = window.$(this);
        
        if (validateForm()) {
          $form.addClass('submitting');
          setTimeout(() => {
            $form.removeClass('submitting');
            alert('Form submitted successfully!');
            resetForm();
          }, 1500);
        } else {
          $form.addClass('shake');
          setTimeout(() => $form.removeClass('shake'), 500);
        }
      });
    }
  }, [validateForm, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form data:', formData);
      // Handle form submission here
    }
  };

  return (
    <div className="form-validator">
      <h2>React jQuery Form Validator</h2>
      <form onSubmit={handleSubmit} noValidate>
        <InputField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullName}
          touched={touched.fullName}
          placeholder="Enter your full name"
        />

        <InputField
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
          placeholder="Enter your email"
        />

        <InputField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          touched={touched.phone}
          placeholder="Enter your phone number"
        />

        <div className="form-group">
          <label className="form-label">Password</label>
          <InputField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
            placeholder="Enter your password"
          />
          <PasswordStrength password={formData.password} />
        </div>

        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.confirmPassword}
          touched={touched.confirmPassword}
          placeholder="Confirm your password"
        />

        <div className="form-actions">
          <button type="button" onClick={resetForm} className="btn btn-secondary">
            Reset
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormValidator;