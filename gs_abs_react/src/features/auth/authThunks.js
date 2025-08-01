import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await client.post('/login', credentials);
      return res.data;
    } catch (err) {
      if (err.response?.status === 422) {
        return rejectWithValue(err.response.data.errors);
      }
      if(err.response?.status === 401) {
        return rejectWithValue({
          _error : err.response.data?.error || 'Invalid credentiels'
        })
      }
      return rejectWithValue({ _error: 'Login failed' });
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await client.post('/register', data);
      return res.data;
    } catch (err) {
      if (err.response?.status === 422) {
        return rejectWithValue(err.response.data.errors);
      }
      return rejectWithValue({ _error: 'Registration failed' });
    }
  }
);
