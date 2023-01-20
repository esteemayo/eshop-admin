import * as actions from '../products/product';
import * as productService from 'services/productService';

export const fetchProducts = async (dispatch) => {
  dispatch(actions.getProductStart());

  try {
    const { data } = await productService.getProducts();
    dispatch(actions.getProductSuccess(data.products));
  } catch (err) {
    dispatch(actions.getProductFailure());
    console.log(err.response);
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(actions.addProductStart());

  try {
    const { data } = await productService.createProduct(product);
    dispatch(actions.addProductSuccess(data.product));
  } catch (err) {
    dispatch(actions.addProductFailure());
    console.log(err.response);
  }
};

export const editProduct = async (id, newProduct, dispatch) => {
  dispatch(actions.updateProductStart());

  try {
    const {
      data: { product },
    } = await productService.updateProduct(id, newProduct);
    dispatch(actions.updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(actions.updateProductFailure());
    console.log(err.response);
  }
};

export const removeProduct = async (id, dispatch) => {
  dispatch(actions.deleteProductStart());

  try {
    await productService.deleteProduct(id);
    dispatch(actions.deleteProductSuccess(id));
  } catch (err) {
    dispatch(actions.deleteProductFailure());
    console.log(err.response);
  }
};
