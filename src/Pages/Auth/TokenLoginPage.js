import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const TokenLoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser, tokenLogin } = useAuth();

  useEffect(() => {
    const processTokenLogin = async () => {
      try {
        // Check if we already have a logged in user
        if (currentUser) {
          if (currentUser.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
          return;
        }

        // Get token from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get('token');
        const userData = urlParams.get('userData');

        if (!tokenParam || !userData) {
          setError('Invalid login parameters');
          setLoading(false);
          return;
        }

        try {
          // Parse the user data
          const parsedUserData = JSON.parse(decodeURIComponent(userData));
          
          // Use the tokenLogin function from AuthContext
          tokenLogin(tokenParam, parsedUserData);

          // Redirect based on role
          if (parsedUserData.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
        } catch (parseError) {
          setError('Invalid user data format');
          console.error('Error parsing user data:', parseError);
        }
      } catch (err) {
        setError(err.message || 'An error occurred during login');
        console.error('Login error:', err);
      } finally {
        setLoading(false);
      }
    };

    processTokenLogin();
  }, [navigate, currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#48182E] mx-auto"></div>
          <p className="mt-4 text-lg">Logging you in...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#48182E] hover:bg-[#6b2644] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#48182E]"
          >
            Go to Login Page
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default TokenLoginPage;