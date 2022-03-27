import jwtDecode from 'jwt-decode';
import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  users: [],
  currentUser: null,
  isLoading: false,
  isError: false,
};

const tokenKey = 'jwtToken';
const token = localStorage.getItem(tokenKey);

if (token) {
  const decodedToken = jwtDecode(token);
  const expiredToken = Date.now();

  if (decodedToken.exp * 1000 < expiredToken) {
    localStorage.removeItem(tokenKey);
  } else {
    initialStateValue.currentUser = decodedToken;
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialStateValue,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.currentUser = payload;
    },
    loginFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    getUserStart: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.users = payload;
    },
    getUserFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
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
      state.isLoading = false;
      state.isError = true;
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem(tokenKey);
    },
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
} = userSlice.actions;

export default userSlice.reducer;
