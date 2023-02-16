import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as productAPI from 'services/productService';

export const fetchProducts = createAsyncThunk(
  'products/getProducts',
  async (_, thunkAPI) => {
    try {
      const { data } = await productAPI.getProducts();
      return data.products;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/createProduct',
  async ({ product, toast }, thunkAPI) => {
    try {
      const { data } = await productAPI.createProduct({ ...product });
      toast.success('Product created');
      return data.product;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const editProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, product, navigate, toast }, thunkAPI) => {
    try {
      const { data } = await productAPI.updateProduct(productId, product);
      toast.success('Product updated');
      navigate('/products');
      return data.product;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const removeProduct = createAsyncThunk(
  'products/deleteProduct',
  async ({ productId, toast }, thunkAPI) => {
    try {
      await productAPI.deleteProduct(productId);
      toast.success('Product deleted');
      return productId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  products: [],
  isLoading: false,
  isSuccess: false,
  isError: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    reset: (state) => {
      state.products = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload;
      })
      .addCase(fetchProducts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products.push(payload);
      })
      .addCase(addProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload.message;
      })
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products[
          state.products.findIndex((item) => item._id === payload._id)
        ] = payload;
      })
      .addCase(editProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload.message;
      })
      .addCase(removeProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products.splice(
          state.products.findIndex((item) => item._id === payload),
          1,
        );
      })
      .addCase(removeProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload.message;
      })
  }
});

export const { reset } = productSlice.actions;

export default productSlice.reducer;
