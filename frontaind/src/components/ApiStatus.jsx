import { useState, useEffect } from 'react';
import { propertyAPI } from '../services/api.js';

const ApiStatus = () => {
  const [status, setStatus] = useState('checking');
  const [error, setError] = useState(null);

  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      setStatus('checking');
      const response = await propertyAPI.getAllProperties();
      
      // Check if the response has the expected structure
      if (response.data && response.data.success) {
        setStatus('connected');
        setError(null);
      } else {
        setStatus('error');
        setError('Invalid API response format');
      }
    } catch (err) {
      setStatus('error');
      if (err.code === 'ERR_NETWORK') {
        setError('Network error - Backend server not running');
      } else if (err.response?.status === 404) {
        setError('API endpoint not found');
      } else {
        setError(err.message);
      }
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'text-green-600 bg-green-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return '✅';
      case 'error':
        return '❌';
      default:
        return '⏳';
    }
  };

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
      <span className="mr-2">{getStatusIcon()}</span>
      <span>
        {status === 'checking' && 'Checking API...'}
        {status === 'connected' && 'API Connected'}
        {status === 'error' && 'API Error'}
      </span>
      {error && (
        <button
          onClick={checkApiStatus}
          className="ml-2 text-xs underline hover:no-underline"
          title={error}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ApiStatus; 