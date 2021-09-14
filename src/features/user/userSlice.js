import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',

  initialState: {
    status: 'idle',
    user: null,
  },

  reducers: {
    setUser: (state, action) => {
      state.status = 'success';
      state.user = action.payload.user;
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
