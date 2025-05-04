import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

const initialState = {
  reports: [],
  users: [],
  status: 'idle',
  error: null,
};

export const fetchReports = createAsyncThunk(
  'admin/fetchReports',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/reports');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/users');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserCoins = createAsyncThunk(
  'admin/updateUserCoins',
  async ({ userId, coins }, { rejectWithValue }) => {
    try {
      const response = await api.put('/admin/updateCoins', { userId, coins });
      return { userId, coins: response.data.coins };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUserCoins.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserCoins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { userId, coins } = action.payload;
        state.users = state.users.map(user =>
          user._id === userId ? { ...user, coins: parseInt(coins) } : user
        );
      })
      .addCase(updateUserCoins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
