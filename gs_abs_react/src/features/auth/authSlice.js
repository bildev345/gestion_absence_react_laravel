import { createSlice } from '@reduxjs/toolkit';
import * as authThunks from './authThunks';
import { logout } from './authAction';

const token = localStorage.getItem('token');

const initialState = {
  user: null,
  token: token || null,
  isAuthenticated : false,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(authThunks.loginUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(authThunks.loginUser.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload.user;
        state.token = payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', payload.token);
        state.error = null;
      })
      .addCase(authThunks.loginUser.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
        state.isAuthenticated = false;
      })

      .addCase(authThunks.registerUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(authThunks.registerUser.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload.user;
        state.token = payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', payload.token);
        state.error = null;
      })
      .addCase(authThunks.registerUser.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
        state.isAuthenticated = false;
      })

      .addCase(logout, state => {
        localStorage.clear();
        state.user = null;
        state.token = null;
        state.status = 'idle';
        state.error = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
