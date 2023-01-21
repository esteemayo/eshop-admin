import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: true,
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    dark: (state) => {
      state.darkMode = true;
    },
    light: (state) => {
      state.darkMode = false;
    },
    toggle: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { dark, light, toggle } = darkModeSlice.actions;

export default darkModeSlice.reducer;
