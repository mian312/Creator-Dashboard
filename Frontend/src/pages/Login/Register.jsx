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
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                  I agree to the <span className="text-purple-600 cursor-pointer">Terms of Service</span> and <span className="text-purple-600 cursor-pointer">Privacy Policy</span>
                </label>
              </div>
            </div>
            
            {/* Register Button with loading state */}
            <button
              className={`w-full ${isLoading ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'} text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 flex items-center justify-center`}
              onClick={handleRegister}
              disabled={isLoading}
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
          
          {/* Social Register */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">Or register with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {/* Google */}
              <button
                type="button"
                className="group w-full inline-flex justify-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
              >
                <svg className="h-5 w-5 group-hover:text-purple-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
              </button>

              {/* Facebook */}
              <button
                type="button"
                className="group w-full inline-flex justify-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
              >
                <svg className="h-5 w-5 group-hover:text-purple-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.007,3H3.993C3.445,3,3,3.445,3,3.993v16.013C3,20.555,3.445,21,3.993,21h8.621v-6.971h-2.346v-2.717h2.346V9.31 c0-2.325,1.42-3.591,3.494-3.591c0.993,0,1.847,0.074,2.096,0.107v2.43l-1.438,0.001c-1.128,0-1.346,0.536-1.346,1.323v1.734h2.69 l-0.35,2.717h-2.34V21h4.587C20.555,21,21,20.555,21,20.007V3.993C21,3.445,20.555,3,20.007,3z" />
                </svg>
              </button>

              {/* Twitter */}
              <button
                type="button"
                className="group w-full inline-flex justify-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
              >
                <svg className="h-5 w-5 group-hover:text-purple-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953,4.57a10,10,0,0,1-2.825.775,4.958,4.958,0,0,0,2.163-2.723,10.054,10.054,0,0,1-3.127,1.184A4.92,4.92,0,0,0,11.78,8.28,13.98,13.98,0,0,1,1.64,3.162,4.822,4.822,0,0,0,3.2,9.713a4.9,4.9,0,0,1-2.23-.616v.061A4.923,4.923,0,0,0,4.88,14a5,5,0,0,1-2.212.085,4.937,4.937,0,0,0,4.604,3.417A9.868,9.868,0,0,1,0,19.78a13.941,13.941,0,0,0,7.548,2.209A13.862,13.862,0,0,0,21.5,8.057,10.055,10.055,0,0,0,23.953,4.57Z" />
                </svg>
              </button>
            </div>
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
