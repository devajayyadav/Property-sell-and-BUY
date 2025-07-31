import { useState, useRef, useEffect } from 'react';
import { propertyAPI } from '../services/api.js';

const LoginModal = ({ onClose, onSuccess, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [show, setShow] = useState(false);
  const [shake, setShake] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setShow(true);
    // Focus the first input
    setTimeout(() => {
      if (modalRef.current) {
        const input = modalRef.current.querySelector('input');
        if (input) input.focus();
      }
    }, 200);
  }, []);

  useEffect(() => {
    if (apiError) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [apiError]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await propertyAPI.login(formData);
      if (response.data.success && response.data.data) {
        onSuccess(response.data.data, response.data.message || 'Login successful!');
        setShow(false);
        setTimeout(onClose, 300);
      } else {
        setApiError(response.data.message || 'Login failed');
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setApiError(err.response.data.message);
      } else if (err.code === 'ERR_NETWORK') {
        setApiError('Network error. Please check your connection.');
      } else {
        setApiError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Animation classes
  const overlayClass = show
    ? 'opacity-100 transition-opacity duration-300'
    : 'opacity-0 pointer-events-none';
  const modalClass = `${
    show
      ? 'scale-100 opacity-100 translate-y-0'
      : 'scale-90 opacity-0 translate-y-4'
  } transition-all duration-300 ${shake ? 'animate-shake' : ''}`;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 ${overlayClass}`}
      style={{ backdropFilter: 'blur(2px)' }}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 ${modalClass}`}
        style={{ minWidth: 340 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
          <button
            onClick={() => {
              setShow(false);
              setTimeout(onClose, 300);
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* API Error */}
        {apiError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded animate-fade-in">
            {apiError}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'} ${formData.email ? 'bg-blue-50' : ''}`}
              disabled={loading}
              autoComplete="username"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 ${errors.password ? 'border-red-500' : 'border-gray-300'} ${formData.password ? 'bg-blue-50' : ''}`}
              disabled={loading}
              autoComplete="current-password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.password}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md font-medium transition-all duration-200 transform active:scale-95 shadow-md ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'}`}
            style={{ letterSpacing: 1 }}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center animate-fade-in">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => {
                setShow(false);
                setTimeout(() => {
                  onClose();
                  onSwitchToSignup();
                }, 300);
              }}
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
      {/* Animations */}
      <style>{`
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoginModal; 