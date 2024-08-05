import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState = {
  user: null,
  isAuth: false,
  loading: false,
  error: null,
};

const saveUserToLocalStorage = (user) => {
  localStorage.setItem('userData', JSON.stringify(user));
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, credentials);
      const { token, email } = response.data;
      Cookies.set('token', token, { expires: 1 });
      const userData = { email, isAuth: true };
      saveUserToLocalStorage(userData);
      return userData;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, userData);
      const { token, email } = response.data;
      Cookies.set('token', token, { expires: 1 });
      const newUser = { email, isAuth: true };
      saveUserToLocalStorage(newUser);
      return newUser;
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed';
      return rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  Cookies.remove('token');
  localStorage.removeItem('userData');
  return null;
});

export const loadUser = createAsyncThunk('auth/loadUser', async () => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Signup failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = !!action.payload;
      });
  },
});

export default authSlice.reducer;
