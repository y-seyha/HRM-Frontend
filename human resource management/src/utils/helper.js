export const validatePassword = (password) => {
  // Password must have at least 1 uppercase, 1 lowercase, 1 number, min 8 chars
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};

// Helper to format date
export const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString();
};
