// Format price with currency symbol
export const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) {
    return '₹0.00';
  }
  
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  return `₹${numericPrice.toFixed(2)}`;
};

// Format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Calculate average rating
export const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
};

// Get rating distribution
export const getRatingDistribution = (reviews) => {
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  if (!reviews) return distribution;
  
  reviews.forEach(review => {
    distribution[review.rating] = (distribution[review.rating] || 0) + 1;
  });
  
  return distribution;
};
