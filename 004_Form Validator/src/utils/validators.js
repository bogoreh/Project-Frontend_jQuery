export const validators = {
  // Email validation
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email is required';
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return null;
  },

  // Password strength validation
  password: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
    if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
    if (!/(?=.*[@$!%*?&])/.test(value)) return 'Password must contain at least one special character';
    return null;
  },

  // Confirm password validation
  confirmPassword: (value, formData) => {
    if (!value) return 'Please confirm your password';
    if (value !== formData.password) return 'Passwords do not match';
    return null;
  },

  // Required field validation
  required: (value, fieldName) => {
    if (!value || value.trim() === '') return `${fieldName} is required`;
    return null;
  },

  // Phone number validation
  phone: (value) => {
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    if (!value) return 'Phone number is required';
    if (!phoneRegex.test(value)) return 'Please enter a valid phone number';
    return null;
  }
};

// jQuery enhanced validation functions
export const jqueryValidators = {
  // Real-time email validation with jQuery
  validateEmail: (email) => {
    const error = validators.email(email);
    return {
      isValid: !error,
      message: error
    };
  },

  // Password strength meter with jQuery
  checkPasswordStrength: (password) => {
    let strength = 0;
    const messages = [];

    if (password.length >= 8) strength++;
    else messages.push('At least 8 characters');

    if (/[a-z]/.test(password)) strength++;
    else messages.push('One lowercase letter');

    if (/[A-Z]/.test(password)) strength++;
    else messages.push('One uppercase letter');

    if (/[0-9]/.test(password)) strength++;
    else messages.push('One number');

    if (/[@$!%*?&]/.test(password)) strength++;
    else messages.push('One special character');

    const strengthLevels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    
    return {
      strength: strength,
      level: strengthLevels[strength] || 'Very Weak',
      messages: messages,
      isValid: strength >= 4
    };
  }
};