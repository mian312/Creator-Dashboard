import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

const initialState = {
  coins: 0,
  savedPosts: [],
  reportedPosts: [],
  email: null,
  mobile: null,
  status: 'idle',
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      // Make sure we're using the api instance with the interceptor
      const response = await api.get('/users/profile');
      return response.data;
    } catch (err) {
      // console.error('Profile fetch error:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const savePost = createAsyncThunk(
  'user/savePost',
  async ({postId, postUrl, source, title, content, thumbnail, author}, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/savePost', { 
        postId, 
        postUrl, 
        source, 
        title, 
        content, 
        thumbnail,
        author
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const reportPost = createAsyncThunk(
  'user/reportPost',
  async ({postId, postUrl}, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/reportPost', { postId, postUrl });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const claimDailyReward = createAsyncThunk(
  'user/claimDailyReward',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/dailyLoginReward');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const claimShareReward = createAsyncThunk(
  'user/claimShareReward',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/sharePostReward');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const claimSavePostReward = createAsyncThunk(
  'user/claimSavePostReward',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/savePostReward');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const completeProfileReward = createAsyncThunk(
  'user/completeProfileReward',
  async ({email, mobile}, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/completeProfileReward', { email, mobile });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchSavedPosts = createAsyncThunk(
  'user/fetchSavedPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/savedPosts');
      // console.log('Saved posts response:', response.data);
      return response.data;
    } catch (err) {
      // console.error('Error fetching saved posts:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coins = action.payload.coins;
        state.savedPosts = action.payload.savedPosts || [];
        state.reportedPosts = action.payload.reportedPosts || [];
        state.email = action.payload.email || null;
        state.mobile = action.payload.mobile || null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.coins = action.payload.coins;
        state.savedPosts = action.payload.savedPosts;
      })
      .addCase(reportPost.fulfilled, (state, action) => {
        state.coins = action.payload.coins;
        state.reportedPosts = action.payload.reportedPosts;
      })
      .addCase(claimDailyReward.fulfilled, (state, action) => {
        state.coins = action.payload.coins;
      })
      .addCase(claimShareReward.fulfilled, (state, action) => {
        state.coins = action.payload.coins;
      })
      .addCase(claimSavePostReward.fulfilled, (state, action) => {
        state.coins = action.payload.coins;
      })
      .addCase(completeProfileReward.fulfilled, (state, action) => {
        state.coins = action.payload.coins;
      })
      .addCase(fetchSavedPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSavedPosts.fulfilled, (state, action) => {
        state.savedPosts = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchSavedPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
