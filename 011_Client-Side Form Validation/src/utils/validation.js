export const validationRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  password: {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
  },
  phone: {
    pattern: /^\+?[\d\s-()]{10,}$/,
    message: 'Please enter a valid phone number'
  }
};

export const validateField = (fieldName, value, isRequired = true) => {
  if (isRequired && !value.trim()) {
    return `${fieldName} is required`;
  }

  if (value.trim() && validationRules[fieldName]) {
    const rule = validationRules[fieldName];
    if (!rule.pattern.test(value)) {
      return rule.message;
    }
  }

  return '';
};

export const validateForm = (formData) => {
  const errors = {};
  
  Object.keys(formData).forEach(field => {
    const error = validateField(field, formData[field], true);
    if (error) {
      errors[field] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};