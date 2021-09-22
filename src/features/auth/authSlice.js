import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './authAPI';
import { setUser } from '../user/userSlice';
import API from '../api.config';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, { rejectWithValue, dispatch }) => {
    try {
      const {
        data: { data },
      } = await api.login(user);
      API.defaults.headers.common['Authorization'] = data.authToken;

      dispatch(setUser(data));

      localStorage.setItem('authToken', data.authToken);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, { rejectWithValue, dispatch }) => {
    try {
      await api.register(user);
      dispatch(loginUser({ email: user.email, password: user.password }));
      return;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  localStorage.removeItem('authToken');
});

const authSlice = createSlice({
  name: 'user',
  initialState: {
    status: 'idle',
    token: null,
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.status = 'success';
      state.token = action.payload.token;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.status = 'loading';
    },
    [registerUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload
        ? action.payload.error
        : action.error.message;
    },
    [loginUser.pending]: (state) => {
      state.status = 'loading';
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = 'success';
      state.token = action.payload.authToken;
      state.error = null;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.token = null;
      state.error = action.payload
        ? action.payload.error
        : action.error.message;
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.error = null;
      state.token = null;
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
