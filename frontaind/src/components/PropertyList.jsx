import { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard.jsx';
import { propertyAPI } from '../services/api.js';

const PropertyList = ({ onViewDetails }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [priceRange, setPriceRange] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await propertyAPI.getAllProperties();
      
      // Handle the API response structure: { success, message, data, timestamp }
      if (response.data && response.data.success && response.data.data) {
        setProperties(response.data.data);
        setError(null);
      } else {
        setError('Invalid response format from API');
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      if (err.code === 'ERR_NETWORK' || err.response?.status === 0) {
        setError('Unable to connect to server. Please check if the backend is running on http://localhost:8080');
      } else if (err.response?.status === 404) {
        setError('API endpoint not found. Please check the backend configuration.');
      } else {
        setError(`Failed to fetch properties: ${err.response?.data?.message || err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || property.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesPrice = !priceRange || (() => {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        return property.price >= min && property.price <= max;
      }
      return property.price >= min;
    })();
    
    return matchesSearch && matchesLocation && matchesPrice;
  });

  const uniqueLocations = [...new Set(properties.map(p => p.location.split(',')[0]))];

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-40">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent"></div>
          <div className="mt-4 text-primary-700 font-semibold text-lg">Loading properties...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <button onClick={fetchProperties} className="btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Properties
            </label>
            <input
              type="text"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              {uniqueLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Prices</option>
              <option value="0-5000000">Under ₹50 Lakhs</option>
              <option value="5000000-10000000">₹50 Lakhs - ₹1 Crore</option>
              <option value="10000000-15000000">₹1 Crore - ₹1.5 Crore</option>
              <option value="15000000-999999999">Above ₹1.5 Crore</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('');
                setPriceRange('');
              }}
              className="w-full btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Properties ({filteredProperties.length})
        </h2>
      </div>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">No properties found matching your criteria</div>
          <button
            onClick={() => {
              setSearchTerm('');
              setLocationFilter('');
              setPriceRange('');
            }}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList; 