import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user';
import productReducer from './product';

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});

export default store;
