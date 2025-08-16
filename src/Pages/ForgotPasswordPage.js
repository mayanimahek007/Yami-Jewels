import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [resetError, setResetError] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  
  const otpRefs = useRef([]);
  const emailRef = useRef('');

  useEffect(() => {
    let interval;
    if (showOtpModal && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtpModal, timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://194.238.18.43:5000/api/users/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to process request');
      }

      emailRef.current = email;
      setShowOtpModal(true);
      setTimer(120);
      setCanResend(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setOtpError('Please enter a 6-digit OTP');
      return;
    }

    setOtpLoading(true);
    setOtpError('');

    try {
      const response = await fetch('http://194.238.18.43:5000/api/users/verifyOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: emailRef.current, otp: otpCode })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid OTP');
      }

      setShowOtpModal(false);
      setShowResetForm(true);
    } catch (err) {
      setOtpError(err.message);
    } finally {
      setOtpLoading(false);
    }
  };

const handleResetPassword = async (e) => {
  e.preventDefault();
  setResetError('');

  if (newPassword !== confirmPassword) {
    setResetError('Passwords do not match');
    return;
  }

  if (newPassword.length < 8) {  // backend requires 8+ chars
    setResetError('Password must be at least 8 characters');
    return;
  }

  setResetLoading(true);

  try {
    const response = await fetch('http://194.238.18.43:5000/api/users/resetPassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: emailRef.current, 
        otp: otp.join(''),      // send the verified OTP
        password: newPassword   // use 'password', not 'newPassword'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to reset password');
    }

    toast('Password reset successfully! Redirecting to login...');
    navigate('/login');
  } catch (err) {
    setResetError(err.message);
  } finally {
    setResetLoading(false);
  }
};

  const handleResendOtp = async () => {
    setCanResend(false);
    setTimer(120);
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    
    try {
      await fetch('http://194.238.18.43:5000/api/users/resendOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: emailRef.current })
      });
    } catch (err) {
      setOtpError('Failed to resend OTP');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-100 flex flex-col justify-center py-12 pt-0 sm:px-6 lg:px-8">
            <Toaster position="top-center" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {showResetForm ? 'Reset Password' : 'Forgot Password'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {showResetForm 
            ? 'Enter your new password' 
            : 'Enter your email address and we\'ll send you an OTP to reset your password'
          }
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && !showResetForm && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {showResetForm ? (
            <form className="space-y-6" onSubmit={handleResetPassword}>
              {resetError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <span className="block sm:inline">{resetError}</span>
                </div>
              )}

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#48182E] focus:border-[#48182E] sm:text-sm"
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#48182E] focus:border-[#48182E] sm:text-sm"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#48182E] hover:bg-[#6b2644] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#48182E] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resetLoading ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>

              <div className="text-center">
                <Link to="/login" className="font-medium text-[#48182E] hover:text-[#6b2644]">
                  Back to login
                </Link>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#48182E] focus:border-[#48182E] sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#48182E] hover:bg-[#6b2644] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#48182E] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Send OTP'}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link to="/login" className="font-medium text-[#48182E] hover:text-[#6b2644]">
                    Back to login
                  </Link>
                </div>
                <div className="text-sm">
                  <Link to="/register" className="font-medium text-[#48182E] hover:text-[#6b2644]">
                    Create an account
                  </Link>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Enter OTP</h3>
              <button
                onClick={() => setShowOtpModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              We've sent a 6-digit OTP to {emailRef.current}
            </p>

            {otpError && (
              <div className="bg-red-100 border border-red-400 text-red-700 text-sm px-3 py-2 rounded mb-3">
                {otpError}
              </div>
            )}

            <div className="flex justify-center space-x-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#48182E] focus:border-[#48182E]"
                />
              ))}
            </div>

            <div className="text-center mb-4">
              <p className="text-sm text-gray-600">
                {canResend ? (
                  <button
                    onClick={handleResendOtp}
                    className="text-[#48182E] hover:text-[#6b2644] font-medium"
                  >
                    Resend OTP
                  </button>
                ) : (
                  `Resend OTP in ${formatTime(timer)}`
                )}
              </p>
            </div>

            <button
              onClick={handleOtpSubmit}
              disabled={otpLoading || otp.join('').length !== 6}
              className="w-full bg-[#48182E] text-white py-2 px-4 rounded-md hover:bg-[#6b2644] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {otpLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
