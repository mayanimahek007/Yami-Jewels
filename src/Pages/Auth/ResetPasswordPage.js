import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { PiEyeLight, PiEyeSlashLight } from 'react-icons/pi';
import headerLogo from '../../assets/images/headerlogo.svg';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://194.238.18.43:5000/api/users/resetPassword/${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to reset password');

      setSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f9f4f4] to-[#fbeef2] px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-6">
          <img src={headerLogo} alt="Yaami Jewels" className="h-16 mx-auto" />
          <h2 className="text-3xl font-bold text-gray-900 mt-4">Reset your password</h2>
          <p className="text-sm text-gray-600">Enter your new password below</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-sm">
            Password has been reset successfully! Redirecting to login page...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1">
              New Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48182E] focus:border-[#48182E]"
              placeholder="Enter new password"
            />
            <button
              type="button"
              className="absolute top-[38px] right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <PiEyeSlashLight size={20} /> : <PiEyeLight size={20} />}
            </button>
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48182E] focus:border-[#48182E]"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              className="absolute top-[38px] right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <PiEyeSlashLight size={20} /> : <PiEyeLight size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-[#48182E] hover:bg-[#6b2644] text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>

          <div className="text-center mt-4">
            <Link to="/login" className="text-sm text-[#48182E] hover:text-[#6b2644] font-medium">
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
