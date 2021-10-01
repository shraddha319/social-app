import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './authAPI';
import { setUser } from '../user/userSlice';
import API from '../api.config';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, { rejectWithValue, dispatch }) => {
    console.log(user);
    try {
      const {
        data: { data },
      } = await api.login(user);
      API.defaults.headers.common['Authorization'] = data.authToken;

      dispatch(setUser({ user: data.user }));

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
  'auth/registerUser',
  async (user, { rejectWithValue, dispatch }) => {
    try {
      const { status } = await api.register(user);
      if (status === 201)
        dispatch(loginUser({ email: user.email, password: user.password }));
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
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

    resetAuth: (state) => {
      state.status = 'idle';
      state.token = null;
      state.error = null;
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
  },
});

export const { setToken, resetAuth } = authSlice.actions;
export default authSlice.reducer;
