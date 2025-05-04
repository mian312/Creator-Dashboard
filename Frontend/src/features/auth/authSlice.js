import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
  username: localStorage.getItem('username') || '',
  lastRewardDate: localStorage.getItem('lastRewardDate') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  profileRewardClaimed: localStorage.getItem('profileRewardClaimed') || false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role);
      localStorage.setItem('username', action.payload.username);
      localStorage.setItem('lastRewardDate', action.payload.lastRewardDate);
      localStorage.setItem('profileRewardClaimed', action.payload.profileRewardClaimed);
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.username = action.payload.username;
      state.lastRewardDate = action.payload.lastRewardDate;
      state.profileRewardClaimed = action.payload.profileRewardClaimed;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      localStorage.removeItem('lastRewardDate');
      localStorage.removeItem('profileRewardClaimed');
      state.token = null;
      state.role = null;
      state.username = '';
      state.lastRewardDate = null;      
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
