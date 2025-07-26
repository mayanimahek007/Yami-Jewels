// Form validation utility functions

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - True if email is valid, false otherwise
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a password meets minimum requirements
 * @param {string} password - The password to validate
 * @returns {boolean} - True if password is valid, false otherwise
 */
export const isValidPassword = (password) => {
  // Password must be at least 8 characters
  return password && password.length >= 8;
};

/**
 * Validates that two passwords match
 * @param {string} password - The first password
 * @param {string} confirmPassword - The second password to compare
 * @returns {boolean} - True if passwords match, false otherwise
 */
export const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

/**
 * Validates a phone number
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - True if phone is valid, false otherwise
 */
export const isValidPhone = (phone) => {
  // Basic phone validation - at least 10 digits
  const phoneRegex = /^\d{10,}$/;
  return phoneRegex.test(phone.replace(/[\s-()]/g, ''));
};

/**
 * Validates that a field is not empty
 * @param {string} value - The value to check
 * @returns {boolean} - True if value is not empty, false otherwise
 */
export const isNotEmpty = (value) => {
  return value && value.trim().length > 0;
};

/**
 * Validates a form object and returns any errors
 * @param {Object} formData - The form data to validate
 * @param {Array} requiredFields - Array of field names that are required
 * @returns {Object} - Object with field names as keys and error messages as values
 */
export const validateForm = (formData, requiredFields = []) => {
  const errors = {};

  // Check required fields
  requiredFields.forEach(field => {
    if (!isNotEmpty(formData[field])) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });

  // Validate email if present
  if (formData.email && !isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Validate password if present
  if (formData.password && !isValidPassword(formData.password)) {
    errors.password = 'Password must be at least 8 characters';
  }

  // Validate password confirmation if present
  if (formData.password && formData.passwordConfirm && 
      !passwordsMatch(formData.password, formData.passwordConfirm)) {
    errors.passwordConfirm = 'Passwords do not match';
  }

  // Validate phone if present
  if (formData.phone && !isValidPhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  return errors;
};