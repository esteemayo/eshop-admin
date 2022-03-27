import http from './httpService';

const apiEndpoint = '/orders';

export function getOrders() {
  return http.get(apiEndpoint);
}

export function getIncome() {
  return http.get(`${apiEndpoint}/income`);
}

export function getIncomeStats(productID) {
  return http.get(`${apiEndpoint}/income?pid=${productID}`);
}
