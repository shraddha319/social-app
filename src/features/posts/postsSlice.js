import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts, createPostAPI } from './postsAPI';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        user: { user },
        auth: { token },
      } = getState();
      const {
        data: { data },
      } = await getPosts(user._id, token);
      return data.posts;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (post, { rejectWithValue, getState }) => {
    try {
      const {
        user: { user },
        auth: { token },
      } = getState();
      const {
        data: { data },
      } = await createPostAPI(user._id, token, post);
      return data.post;
    } catch (err) {
      console.log(err);
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    status: 'idle',
    posts: [],
    error: null,
  },

  reducers: {},

  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'success';
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload
        ? action.payload.error
        : action.error.message;
    },
    [createPost.pending]: (state, action) => {
      state.status = 'loading';
    },
    [createPost.fulfilled]: (state, action) => {
      state.status = 'success';
      state.posts.push(action.payload);
    },
    [createPost.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload
        ? action.payload.error
        : action.error.message;
    },
  },
});

export default postsSlice.reducer;
