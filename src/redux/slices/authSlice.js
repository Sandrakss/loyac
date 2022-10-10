import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profileRequestStatus: 'idle',
  user: null,
};

export const authSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
