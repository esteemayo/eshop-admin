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
  async ({ credentials, navigate, toast }, thunkAPI) => {
    try {
      const { data } = await authAPI.register({ ...credentials });
      toast.success('Account created successfully');
      navigate('/users');
      return data.details;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  'users/getUsers',
  async (_, thunkAPI) => {
    try {
      const { data } = await userAPI.getAllUsers();
      return data.users;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'users/getUser',
  async (userId, thunkAPI) => {
    try {
      const { data } = await userAPI.getUser(userId);
      return data.doc;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const editUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, updUser, navigate, toast }, thunkAPI) => {
    try {
      const { data } = await userAPI.updateUser(userId, updUser);
      toast.success('User updated');
      navigate('/users');
      return data.doc;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const removeUser = createAsyncThunk(
  'users/deleteUser',
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
  user: {},
  currentUser: user ?? null,
  isLoading: false,
  isSuccess: false,
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
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        setToStorage(tokenKey, payload);
        state.currentUser = payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.currentUser = null;
        state.isError = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users.push(payload);
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users[
          state.users.findIndex((item) => item._id === payload._id)
        ] = payload;
      })
      .addCase(editUser.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(removeUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users.splice(
          state.users.findIndex((userId) => userId === payload),
          1,
        );
      })
      .addCase(removeUser.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
