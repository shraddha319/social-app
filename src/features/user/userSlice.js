import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUser } from './userAPI';

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
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
