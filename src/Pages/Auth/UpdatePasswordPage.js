import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PiEyeLight, PiEyeSlashLight } from 'react-icons/pi';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import headerLogo from '../../assets/images/webp/headerlogo.webp';

const UpdatePasswordPage = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      setSuccess(false);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://194.238.18.43:5000/api/users/updatePassword', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update password');

      setSuccess(true);
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });

      if (data.token) {
        localStorage.setItem('token', data.token);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="py-12 flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg space-y-6 border border-pink-100">
        
        {/* Logo */}
        <div className="text-center">
          {/* <img src={headerLogo} alt="Yami Jewels" className="mx-auto h-16" /> */}
          <h2 className=" text-2xl font-bold text-gray-800">Update Your Password</h2>
          <p className="text-sm text-gray-500">Keep your account secure by changing your password regularly</p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            <FaExclamationCircle className="text-red-500" />
            {error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            <FaCheckCircle className="text-green-500" />
            Password updated successfully!
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Current Password */}
          <div className="relative">
            <input
              id="currentPassword"
              name="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              required
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <PiEyeSlashLight className="text-gray-500" /> : <PiEyeLight className="text-gray-500" />}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <input
              id="newPassword"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              required
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <PiEyeSlashLight className="text-gray-500" /> : <PiEyeLight className="text-gray-500" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <PiEyeSlashLight className="text-gray-500" /> : <PiEyeLight className="text-gray-500" />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-[#e2c17c] to-[#bfa14a] text-white font-medium rounded-lg shadow-md transition disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>

          {/* Back Link */}
          <div className="text-center">
            <Link to="/" className="text-sm text-black font-medium">
              ← Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
