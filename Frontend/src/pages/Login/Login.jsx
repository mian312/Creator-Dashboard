import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

// Lucide icons for a more modern look
import { User, Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUserLogin, setIsUserLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(loginStart());
    const endpoint = isUserLogin ? '/api/auth/login' : '/api/auth/loginAdmin';
    
    try {
      const response = await axios.post(endpoint, { username, password });
      
      // Set role based on login type before dispatching success
      const userData = {
        ...response.data,
        role: isUserLogin ? 'user' : 'admin',
        username: username
      };
      
      dispatch(loginSuccess(userData));
      toast.success('Login successful!');
      navigate(isUserLogin ? '/user-dashboard' : '/admin-dashboard');
    } catch (error) {
      dispatch(loginFailure(error.response?.data || 'Login failed'));
      toast.error('Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100">
      <div className="relative w-full max-w-md overflow-hidden bg-white rounded-3xl shadow-2xl">
        {/* Glass-like accent elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-indigo-300/20 to-purple-300/30 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-300/20 to-indigo-300/30 rounded-full blur-3xl translate-y-12 -translate-x-12"></div>
        
        {/* Header Section with improved gradient */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
          <h2 className="text-3xl font-bold tracking-tight text-center">Welcome Back</h2>
          <p className="text-indigo-100 text-center mt-2">Please sign in to your account</p>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-full shadow-lg">
            {isUserLogin ? 
              <User size={28} className="text-indigo-600" /> : 
              <Lock size={28} className="text-purple-600" />
            }
          </div>
        </div>
        
        <div className="p-8 pt-12">
          {/* Toggle Section with improved styling */}
          <div className="mb-8">
            <div className="inline-flex rounded-lg border border-indigo-100 p-1 w-full bg-indigo-50/50 shadow-sm">
              <button
                type="button"
                className={`w-1/2 px-4 py-3 text-sm font-medium rounded-md transition-all duration-300 ${
                  isUserLogin ? 'bg-white text-indigo-600 shadow-md' : 'text-gray-500 hover:bg-white/50'
                }`}
                onClick={() => setIsUserLogin(true)}
              >
                User Login
              </button>
              <button
                type="button"
                className={`w-1/2 px-4 py-3 text-sm font-medium rounded-md transition-all duration-300 ${
                  !isUserLogin ? 'bg-white text-purple-600 shadow-md' : 'text-gray-500 hover:bg-white/50'
                }`}
                onClick={() => setIsUserLogin(false)}
              >
                Admin Login
              </button>
            </div>
          </div>
          
          <form onSubmit={handleLogin}>
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
                  className="appearance-none bg-gray-50 border-2 border-gray-100 rounded-xl w-full py-3 pl-10 pr-4 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
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
                  className="appearance-none bg-gray-50 border-2 border-gray-100 rounded-xl w-full py-3 pl-10 pr-12 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-400 hover:text-indigo-500" />
                  ) : (
                    <Eye size={18} className="text-gray-400 hover:text-indigo-500" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  Remember me
                </label>
              </div>
            </div>
            
            {/* Login Button with loading state */}
            <button
              className={`w-full ${isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 flex items-center justify-center`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;