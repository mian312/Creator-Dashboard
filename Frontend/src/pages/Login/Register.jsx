import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { User, Lock, Key, UserPlus, UserCheck, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUserRegister, setIsUserRegister] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminKey, setShowAdminKey] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    const endpoint = isUserRegister ? '/api/auth/register' : '/api/auth/registerAdmin';
    const data = isUserRegister ? { username, password } : { username, password, adminKey };
    try {
      await axios.post(endpoint, data);
      dispatch(loginFailure(null)); // Reset the loading state
      toast.success('Registration successful! Please login to continue.');
      navigate('/login');
    } catch (error) {
      dispatch(loginFailure(error.response?.data || 'Registration failed'));
      toast.error('Registration failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100">
      <div className="relative w-full max-w-md overflow-hidden bg-white rounded-3xl shadow-2xl">
        {/* Glass-like accent elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-300/20 to-blue-300/30 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-300/20 to-purple-300/30 rounded-full blur-3xl translate-y-12 -translate-x-12"></div>
        
        {/* Header Section with gradient */}
        <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white">
          <h2 className="text-3xl font-bold tracking-tight text-center">Create Account</h2>
          <p className="text-purple-100 text-center mt-2">Join our community today</p>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-full shadow-lg">
            {isUserRegister ? 
              <UserPlus size={28} className="text-purple-600" /> : 
              <UserCheck size={28} className="text-indigo-600" />
            }
          </div>
        </div>
        
        <div className="p-8 pt-12">
          {/* Toggle Section with improved styling */}
          <div className="mb-8">
            <div className="inline-flex rounded-lg border border-purple-100 p-1 w-full bg-purple-50/50 shadow-sm">
              <button
                type="button"
                className={`w-1/2 px-4 py-3 text-sm font-medium rounded-md transition-all duration-300 ${
                  isUserRegister ? 'bg-white text-purple-600 shadow-md' : 'text-gray-500 hover:bg-white/50'
                }`}
                onClick={() => setIsUserRegister(true)}
              >
                User Registration
              </button>
              <button
                type="button"
                className={`w-1/2 px-4 py-3 text-sm font-medium rounded-md transition-all duration-300 ${
                  !isUserRegister ? 'bg-white text-indigo-600 shadow-md' : 'text-gray-500 hover:bg-white/50'
                }`}
                onClick={() => setIsUserRegister(false)}
              >
                Admin Registration
              </button>
            </div>
          </div>
          
          <div>
            {/* Username Field with icon */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  className="appearance-none bg-gray-50 border-2 border-gray-100 rounded-xl w-full py-3 pl-10 pr-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            
            {/* Password Field with toggle visibility */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  className="appearance-none bg-gray-50 border-2 border-gray-100 rounded-xl w-full py-3 pl-10 pr-12 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-400 hover:text-purple-500" />
                  ) : (
                    <Eye size={18} className="text-gray-400 hover:text-purple-500" />
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-1">Password should be at least 8 characters long</p>
            </div>
            
            {/* Admin Key Field (conditional) */}
            {!isUserRegister && (
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="adminKey">
                  Admin Key
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key size={18} className="text-gray-400" />
                  </div>
                  <input
                    className="appearance-none bg-gray-50 border-2 border-gray-100 rounded-xl w-full py-3 pl-10 pr-12 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                    id="adminKey"
                    type={showAdminKey ? "text" : "password"}
                    placeholder="Enter admin authorization key"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowAdminKey(!showAdminKey)}
                  >
                    {showAdminKey ? (
                      <EyeOff size={18} className="text-gray-400 hover:text-purple-500" />
                    ) : (
                      <Eye size={18} className="text-gray-400 hover:text-purple-500" />
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Terms and Conditions */}
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                  I agree to the <span className="text-purple-600 cursor-pointer">Terms of Service</span> and <span className="text-purple-600 cursor-pointer">Privacy Policy</span>
                </label>
              </div>
              {!termsAccepted && <p className="text-xs text-red-500 mt-1 ml-1">You must agree to the Terms and Conditions</p>}
            </div>
            
            {/* Register Button with loading state */}
            <button
              className={`w-full ${isLoading ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'} text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 flex items-center justify-center`}
              onClick={handleRegister}
              disabled={isLoading || !termsAccepted}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
          
          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href='/login' className="font-medium text-purple-600 hover:text-purple-500 transition-colors cursor-pointer">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
