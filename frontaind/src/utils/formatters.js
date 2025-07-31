// Helper function to format price in Indian currency
export const formatPrice = (price) => {
  if (!price) return 'Price on request';
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

// Format area
export const formatArea = (area) => {
  if (!area) return 'N/A';
  return area;
};

// Format date
export const formatDate = (date) => {
  if (!date) return 'N/A';
  
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
};

// Format phone number
export const formatPhone = (phone) => {
  if (!phone) return 'N/A';
  
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as Indian phone number
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  
  return phone;
}; 