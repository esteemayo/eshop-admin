import jwtDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as authAPI from 'services/authService';
import * as userAPI from 'services/userService';
import {
  clearFromStorage,
  getFromStorage,
  setToStorage,
  tokenKey,
} from 'utils';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ credentials, toast }, thunkAPI) => {
    try {
      const { data } = await authAPI.login({ ...credentials });
      if (data.role === 'admin') {
        toast.success('Login successful');
        return data.details;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ credentials, toast }, thunkAPI) => {
    try {
      const { data } = await authAPI.register({ ...credentials });
      toast.success('Account created successfully');
      return data.details;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  'auth/getUsers',
  async (_, thunkAPI) => {
    try {
      const { data } = await userAPI.getAllUsers();
      return data.users;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const removeUser = createAsyncThunk(
  'auth/deleteUser',
  async (userId, thunkAPI) => {
    try {
      await userAPI.deleteUser(userId);
      return userId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const token = authAPI.getJwt();
const user = getFromStorage(tokenKey);

const initialState = {
  users: [],
  currentUser: user ?? null,
  isLoading: false,
  isError: false,
};

if (token) {
  const decodedToken = jwtDecode(token);
  const expiryDate = Date.now();

  if (expiryDate > decodedToken.exp * 1000) {
    clearFromStorage();
    initialState.currentUser = null;
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      clearFromStorage();
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        setToStorage(tokenKey, payload);
        state.currentUser = payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.currentUser = null;
        state.isError = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users.push(payload);
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(removeUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users.splice(
          state.users.findIndex((userId) => userId === payload),
          1,
        );
      })
      .addCase(removeUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
