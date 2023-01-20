import http from './httpService';

const apiEndpoint = '/products';

const productUrl = (productID) => `${apiEndpoint}/${productID}`;

export const getProducts = () => http.get(apiEndpoint);

export const getProductById = (productID) =>
  http.get(productUrl(productID));


export const getProductBySlug = (slug) =>
  http.get(`${apiEndpoint}/details/${slug}`);

export const createProduct = (data) => http.post(apiEndpoint, data);

export const updateProduct = (productID, data) =>
  http.patch(productUrl(productID), data);

export const deleteProduct = (productID) =>
  http.delete(productUrl(productID));
