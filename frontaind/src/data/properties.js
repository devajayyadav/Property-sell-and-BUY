export const propertiesData = [
  {
    id: 1,
    title: "2 BHK Apartment in Mumbai",
    location: "Andheri East, Mumbai",
    price: 8500000,
    imageUrl: "https://cdn.pixabay.com/photo/2016/11/29/03/53/architecture-1867187_1280.jpg",
    description: "Spacious 2-bedroom apartment with balcony and great sunlight.",
    bedrooms: 2,
    bathrooms: 2,
    area: "1200 sq ft"
  },
 
];

// Helper function to format price in Indian currency
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}; 