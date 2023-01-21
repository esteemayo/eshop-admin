import { configureStore } from '@reduxjs/toolkit';

import userReducer from 'redux/user/userSlice';
import productReducer from 'redux/products/productSlice';
import darkModeReducer from 'redux/darkMode/darkModeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    darkMode: darkModeReducer,
  },
});

export default store;
