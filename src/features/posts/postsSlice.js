import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './postsAPI';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        user: { user },
      } = getState();
      const {
        data: { data },
      } = await api.getPosts(user._id);
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
      } = getState();
      const {
        data: { data },
      } = await api.createPost(user._id, post);
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

export const likePost = createAsyncThunk(
  'posts/likePost',
  async ({ postId, type }, { rejectWithValue, getState }) => {
    try {
      const {
        user: { user },
      } = getState();
      const { status } = await api.updatePost({
        type,
        postId,
        userId: user._id,
      });
      if (status === 204) return { userId: user._id, postId, type };
    } catch (err) {
      console.log(err);
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const commentOnPost = createAsyncThunk(
  'posts/commentOnPost',
  async ({ postId, comment }, { rejectWithValue, getState }) => {
    try {
      const {
        user: { user },
      } = getState();
      const { status } = await api.updatePost({
        type: 'comment',
        comment,
        postId,
        userId: user._id,
      });
      if (status === 204) return { user, postId, comment };
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

  reducers: {
    resetPosts: (state) => {
      state.status = 'idle';
      state.posts = [];
      state.error = null;
    },
  },

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

    [likePost.fulfilled]: (state, action) => {
      const { type, postId, userId } = action.payload;

      if (type === 'like')
        state.posts = state.posts.map((post) =>
          post._id === postId
            ? { ...post, likes: post.likes.concat([userId]) }
            : post
        );
      else if (type === 'dislike') {
        const postIndex = state.posts.findIndex((post) => post._id === postId);

        state.posts[postIndex] = {
          ...state.posts[postIndex],
          likes: state.posts[postIndex].likes.filter((user) => user !== userId),
        };
      }
    },

    [commentOnPost.fulfilled]: (state, action) => {
      const { comment, user, postId } = action.payload;

      const postIndex = state.posts.findIndex((post) => post._id === postId);
      state.posts[postIndex].comments.push({
        comment,
        user: { name: user.name, username: user.username },
      });
    },
  },
});

export default postsSlice.reducer;
export const { resetPosts } = postsSlice.actions;
