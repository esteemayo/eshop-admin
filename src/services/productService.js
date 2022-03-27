import http from './httpService';

const apiEndpoint = '/products';

const productUrl = (productID) => {
  return `${apiEndpoint}/${productID}`;
};

export function getProducts() {
  return http.get(apiEndpoint);
}

export function getProductById(productID) {
  return http.get(productUrl(productID));
}

export function getProductBySlug(slug) {
  return http.get(`${apiEndpoint}/details/${slug}`);
}

export function createProduct(data) {
  return http.post(apiEndpoint, data);
}

export function updateProduct(productID, data) {
  return http.patch(productUrl(productID), data);
}

export function deleteProduct(productID) {
  return http.delete(productUrl(productID));
}
