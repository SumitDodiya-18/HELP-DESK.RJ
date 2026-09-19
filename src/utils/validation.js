
export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  return '';
};

export const validateTicketForm = (formData) => {
  const errors = {};

  if (!formData.subject || !formData.subject.trim()) {
    errors.subject = 'Subject is required';
  } else if (formData.subject.trim().length < 5) {
    errors.subject = 'Subject must be at least 5 characters long';
  }

  if (!formData.description || !formData.description.trim()) {
    errors.description = 'Description is required';
  } else if (formData.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters long';
  }

  if (!formData.priority) {
    errors.priority = 'Please select a priority level';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};