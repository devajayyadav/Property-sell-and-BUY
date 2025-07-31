import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import PropertyList from './components/PropertyList.jsx';
import PropertyDetail from './components/PropertyDetail.jsx';
import PropertyDetailPage from './pages/PropertyDetailPage.jsx';
import ApiStatus from './components/ApiStatus.jsx';
import SignupModal from './components/SignupModal.jsx';
import Notification from './components/Notification.jsx';
import LoginModal from './components/LoginModal.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function AppContent() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleViewDetails = (property) => {
    navigate(`/property/${property.id}`);
  };

  const handleCloseDetail = () => {
    setSelectedProperty(null);
  };

  const handleSignupSuccess = (message) => {
    setNotification({
      message: message || 'Account created successfully!',
      type: 'success'
    });
    setShowSignup(false);
    setShowLogin(true);
  };

  const handleLoginSuccess = (userData, message) => {
    setUser(userData);
    setNotification({
      message: message || 'Login successful!',
      type: 'success'
    });
    setShowLogin(false);
    navigate('/admin');
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <button 
                  onClick={() => navigate('/')}
                  className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  🏠 PropertyFinder
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ApiStatus />
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700">Welcome, {user.firstName}!</span>
                  <button className="btn-secondary">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button className="btn-secondary" onClick={() => setShowLogin(true)}>
                    Sign In
                  </button>
                  <button 
                    onClick={() => setShowSignup(true)}
                    className="btn-primary"
                  >
                    Sign Up
                  </button>
                </div>
              )}
              <button className="btn-primary">
                List Property
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PropertyList onViewDetails={handleViewDetails} />
      </main>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetail
          property={selectedProperty}
          onClose={handleCloseDetail}
        />
      )}

      {/* Signup Modal */}
      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSuccess={handleSignupSuccess}
        />
      )}

      {/* Login Modal */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Admin Panel Route */}
      <Routes>
        <Route path="/admin" element={
          <ProtectedRoute user={user}>
            <AdminPanel />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
