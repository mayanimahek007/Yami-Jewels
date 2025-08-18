import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import headerLogo from '../../assets/images/headerlogo.svg';

const DirectAdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { tokenLogin } = useAuth();

  useEffect(() => {
    const processDirectLogin = async () => {
      try {
        // Sample login response data (in a real scenario, this would come from an API)
        const loginResponse = { 
          status: "success", 
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODRmZjMwNDA1NjQzZjBiZmM2NWQyMyIsImlhdCI6MTc1MzU1MTk1MSwiZXhwIjoxNzU2MTQzOTUxfQ.kOXKCJkk5vvUgJ5E5HO2UpW71ek-xAgIVW0V5etK9XQ", 
          data: { 
            user: { 
              _id: "6884ff30405643f0bfc65d23", 
              name: "Admin User", 
              email: "mayanimahek007@gmail.com", 
              role: "admin" 
            } 
          } 
        };

        // Check if the login was successful
        if (loginResponse.status === 'success' && loginResponse.token && loginResponse.data.user) {
          // Use the tokenLogin function from AuthContext
          // Pass the entire response object to let tokenLogin handle the nested structure
          tokenLogin(loginResponse.token, loginResponse);

          // Redirect to admin dashboard
          navigate('/admin/dashboard');
        } else {
          setError('Invalid login response');
        }
      } catch (err) {
        setError(err.message || 'An error occurred during login');
        console.error('Login error:', err);
      } finally {
        setLoading(false);
      }
    };

    processDirectLogin();
  }, [navigate, tokenLogin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <img
            className="mx-auto h-20 w-auto mb-4"
            src={headerLogo}
            alt="Yami Jewels"
          />
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#48182E] mx-auto"></div>
          <p className="mt-4 text-lg">Logging you in as Admin...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <img
            className="mx-auto h-20 w-auto mb-4"
            src={headerLogo}
            alt="Yami Jewels"
          />
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

export default DirectAdminLogin;