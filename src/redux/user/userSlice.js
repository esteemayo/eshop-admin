import jwtDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as authAPI from 'services/authService';
import { clearFromStorage, getFromStorage, setToStorage, tokenKey } from 'utils';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ credentials, toast }, thunkAPI) => {
    try {
      const { data } = await authAPI.login({ ...credentials });
      toast.success('Login successful');
      return data.details;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/login',
  async ({ credentials, toast }, thunkAPI) => {
    try {
      const { data } = await authAPI.register({ ...credentials });
      if (data.role === 'admin') {
        toast.success('Account created successfully');
        return data.details;
      }
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
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.currentUser = payload;
    },
    loginFailure: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    registerUserStart: (state) => {
      state.isLoading = true;
    },
    registerUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.users.push(payload);
    },
    registerUserFailure: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    getUserStart: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.users = payload;
    },
    getUserFailure: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    deleteUserStart: (state) => {
      state.isLoading = true;
    },
    deleteUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.users.splice(
        state.users.findIndex((user) => user._id === payload),
        1
      );
    },
    deleteUserFailure: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
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
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.currentUser = null;
        state.isError = true;
      })
  },
});

export const {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUserFailure,
  getUserStart,
  getUserSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  registerUserFailure,
  registerUserStart,
  registerUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
