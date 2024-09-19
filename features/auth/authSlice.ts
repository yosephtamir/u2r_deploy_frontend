import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    status: 'loading',
    error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.status = 'succeeded';
      state.error = null;
    },
    loginFailure(state, action) {
      state.isAuthenticated = false;
      state.error = action.payload.error; // Error message
      state.status = 'failed';
    },
    authenticateSuccess(state) {
      state.isAuthenticated = true;
      state.status = 'succeeded';
      state.error = null;
    },
    authenticateFailure(state, action) {
      state.isAuthenticated = false;
      state.error = action.payload.error; // Error message
      state.status = 'failed';
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.status = 'failed';
    },
  },
});

export const { authenticateSuccess, authenticateFailure, loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;