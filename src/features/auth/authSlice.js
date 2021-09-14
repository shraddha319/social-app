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

const authSlice = createSlice({
  name: 'user',
  initialState: {
    status: 'idle',
    token: null,
    error: null,
  },
  reducers: {},
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
  },
});

export default authSlice.reducer;
