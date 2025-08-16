import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PiUser } from 'react-icons/pi';

const ProfilePage = () => {
  const { currentUser, updateProfile, loading, error } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setFormData({
      name: currentUser.name || '',
      phone: currentUser.phone || '',
      address: currentUser.address || ''
    });
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    try {
      await updateProfile(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Profile update error:', err);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto bg-white/90 backdrop-blur shadow-xl rounded-2xl p-8 relative overflow-hidden">
        
        {/* Decorative circles */}
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-pink-200 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-200 rounded-full opacity-30 blur-2xl"></div>

        {/* Profile header */}
        <div className="text-center mb-8 relative z-10">
          <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-[#e2c17c] to-[#bfa14a] flex items-center justify-center shadow-md">
<PiUser 
  className="text-white 
             w-9 h-9       /* default small screens */
             sm:w-16 sm:h-16 /* small screens ≥ 640px */
             md:w-20 md:h-20 /* medium screens ≥ 768px */
             lg:w-24 lg:h-24 /* large screens ≥ 1024px */
             xl:w-28 xl:h-28 /* extra-large screens ≥ 1280px */" 
/>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-800">My Profile</h2>
          <p className="mt-1 text-sm text-gray-500">Keep your information up-to-date ✨</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4 text-sm animate-pulse">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md mb-4 text-sm animate-bounce">
             Profile updated successfully!
          </div>
        )}

        {/* Form */}
        <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 outline-none transition"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              disabled
              value={currentUser.email}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 outline-none transition"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
            <textarea
              id="address"
              name="address"
              rows="3"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 outline-none transition"
              placeholder="Your address"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-[#e2c17c] to-[#bfa14a] text-white shadow-md hover:shadow-lg transform hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : " Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
