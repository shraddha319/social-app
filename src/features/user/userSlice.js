import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUser, getUser } from './userAPI';
import { logoutUser, setToken } from '../auth/authSlice';
import { useNavigate } from 'react-router-dom';

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (update, { getState, rejectWithValue }) => {
    try {
      const {
        user: {
          user: { _id },
        },
        auth: { token },
      } = getState();
      await updateUser(_id, token, update);
      return update;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const InitializeUser = createAsyncThunk(
  'user/getUser',
  async ({ userId, token }, { rejectWithValue, dispatch }) => {
    try {
      const {
        data: { data },
      } = await getUser(userId, token);
      dispatch(setToken({ token }));
      return data.user;
    } catch (err) {
      dispatch(logoutUser());
      console.log(err, err.response);
      useNavigate()('/');
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',

  initialState: {
    status: 'idle',
    user: null,
    error: null,
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
  },

  extraReducers: {
    [updateProfile.pending]: (state) => {
      state.status = 'loading';
    },
    [updateProfile.fulfilled]: (state, action) => {
      Object.keys(action.payload).forEach((field) => {
        console.log(field, state.user[field], action.payload[field]);
        state.user[field] = action.payload[field];
      });
      state.status = 'success';
    },
    [updateProfile.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload
        ? action.payload.error
        : action.error.message;
    },
    [InitializeUser.pending]: (state) => {
      state.status = 'loading';
    },
    [InitializeUser.fulfilled]: (state, action) => {
      state.status = 'success';
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
