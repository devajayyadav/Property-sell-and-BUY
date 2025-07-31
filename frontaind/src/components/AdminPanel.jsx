import { useState, useEffect } from 'react';
import { propertyAPI } from '../services/api.js';

const AdminPanel = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProp] = useState({
    title: '',
    location: '',
    price: '',
    imageUrl: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    area: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await propertyAPI.getAllProperties();
      if (response.data && response.data.success && response.data.data) {
        setProperties(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await propertyAPI.createProperty(newProperty);
      if (response.data && response.data.success) {
        setNewProp({
          title: '',
          location: '',
          price: '',
          imageUrl: '',
          description: '',
          bedrooms: '',
          bathrooms: '',
          area: ''
        });
        fetchProperties();
      }
    } catch (err) {
      setError('Failed to add property');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;

    try {
      setLoading(true);
      const response = await propertyAPI.deleteProperty(id);
      if (response.data && response.data.success) {
        fetchProperties();
      }
    } catch (err) {
      setError('Failed to delete property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Panel - Property Management</h1>

      {/* Add Property Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Property</h2>
        <form onSubmit={handleAddProperty} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={newProperty.title}
              onChange={(e) => setNewProp({ ...newProperty, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={newProperty.location}
              onChange={(e) => setNewProp({ ...newProperty, location: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              value={newProperty.price}
              onChange={(e) => setNewProp({ ...newProperty, price: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              value={newProperty.imageUrl}
              onChange={(e) => setNewProp({ ...newProperty, imageUrl: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newProperty.description}
              onChange={(e) => setNewProp({ ...newProperty, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
              <input
                type="number"
                value={newProperty.bedrooms}
                onChange={(e) => setNewProp({ ...newProperty, bedrooms: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
              <input
                type="number"
                value={newProperty.bathrooms}
                onChange={(e) => setNewProp({ ...newProperty, bathrooms: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area (sq ft)</label>
              <input
                type="number"
                value={newProperty.area}
                onChange={(e) => setNewProp({ ...newProperty, area: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Property'}
          </button>
        </form>
      </div>

      {/* Property List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Properties</h2>
        {properties.map((property) => (
          <div key={property.id} className="border-b pb-4 mb-4 last:border-b-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{property.title}</h3>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-gray-600">₹{property.price.toLocaleString()}</p>
              </div>
              <button
                onClick={() => handleDeleteProperty(property.id)}
                className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
