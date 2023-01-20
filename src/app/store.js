import { configureStore } from '@reduxjs/toolkit';

import userReducer from 'redux/user/userSlice';
import productReducer from 'redux/products/productSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});

export default store;
