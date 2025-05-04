import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  feed: [],
  hasMore: true,
  status: 'idle',
  error: null,
};

export const fetchTwitterPosts = createAsyncThunk(
  'posts/fetchTwitterPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/twitter/posts');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchRedditPosts = createAsyncThunk(
  'posts/fetchRedditPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/reddit/posts');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.feed = action.payload;
    },
    appendPosts: (state, action) => {
      state.feed = [...state.feed, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTwitterPosts.fulfilled, (state, action) => {
        state.feed = [...state.feed, ...action.payload];
      })
      .addCase(fetchRedditPosts.fulfilled, (state, action) => {
        state.feed = [...state.feed, ...action.payload];
      });
  },
});

export const { setPosts, appendPosts } = postsSlice.actions;

export default postsSlice.reducer;
