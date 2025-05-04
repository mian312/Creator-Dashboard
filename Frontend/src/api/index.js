import axios from 'axios';
import { getToken } from '../utils/auth';

const api = axios.create({
  baseURL: '/api', // It is being proxied
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const fetchPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

export const savePost = async (postId) => {
  const response = await api.post('/users/savePost', { postId });
  return response.data;
};

export const reportPost = async (postId) => {
  const response = await api.post('/users/reportPost', { postId });
  return response.data;
};

export const getReports = async () => {
  const response = await api.get('/admin/reports');
  return response.data;
};

export const updateUserCoins = async (userId, coins) => {
  const response = await api.put('/admin/updateCoins', { userId, coins });
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const completeProfileReward = async ({ email, mobile }) => {
  const response = await api.post('/users/completeProfileReward', { email, mobile });
  return response.data;
};

export const fetchSavedPosts = async () => {
  const response = await api.get('/users/savedPosts');
  return response.data;
};

export default api;
