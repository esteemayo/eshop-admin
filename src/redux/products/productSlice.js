import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductStart: (state) => {
      state.isLoading = true;
    },
    getProductSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.products = payload;
    },
    getProductFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    addProductStart: (state) => {
      state.isLoading = true;
    },
    addProductSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.products.push(payload);
    },
    addProductFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    updateProductStart: (state) => {
      state.isLoading = true;
    },
    updateProductSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.products[
        state.products.findIndex((item) => item._id === payload.id)
      ] = payload.product;
    },
    updateProductFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    deleteProductStart: (state) => {
      state.isLoading = true;
    },
    deleteProductSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === payload),
        1
      );
    },
    deleteProductFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} = productSlice.actions;

export default productSlice.reducer;
