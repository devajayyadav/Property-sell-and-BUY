import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Your Spring Boot backend URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Enable credentials for CORS
  withCredentials: false,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Property API methods - direct API calls to your backend
export const propertyAPI = {
  getAllProperties: () => api.get('/properties'),
  
  getPropertyById: (id) => api.get(`/properties/${id}`),
  
  createProperty: (propertyData) => api.post('/properties', propertyData),
  
  updateProperty: (id, propertyData) => api.put(`/properties/${id}`, propertyData),
  
  deleteProperty: (id) => api.delete(`/properties/${id}`),
  
  searchProperties: (params) => api.get('/properties/search', { params }),
  
  // User authentication methods
  signup: (userData) => api.post('/auth/signup', userData),
  
  login: (credentials) => api.post('/login', credentials),
  
  logout: () => api.post('/logout'),
  
  getCurrentUser: () => api.get('/me'),
};

export default api; 