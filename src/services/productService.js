import http from './httpService';

const apiEndpoint = '/products';

const productUrl = (productId) => `${apiEndpoint}/${productId}`;

export const getProducts = () => http.get(apiEndpoint);

export const getProductById = (productId) =>
  http.get(productUrl(productId));


export const getProductBySlug = (slug) =>
  http.get(`${apiEndpoint}/details/${slug}`);

export const createProduct = (data) => http.post(apiEndpoint, data);

export const updateProduct = (productId, data) =>
  http.patch(productUrl(productId), data);

export const deleteProduct = (productId) =>
  http.delete(productUrl(productId));
