import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login } from './authAPI';
import { setUser } from '../user/userSlice';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, { rejectWithValue, dispatch }) => {
    try {
      const {
        data: { data },
      } = await login(user);
      dispatch(setUser(data));
      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('token', data.authToken);
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
      await register(user);
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

export const logoutUser = createAsyncThunk('user/logoutUser', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
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
      state.error = action.payload
        ? action.payload.error
        : action.error.message;
    },
    [logoutUser.success]: (state, action) => {
      state.status = 'idle';
      state.error = null;
      state.token = null;
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
