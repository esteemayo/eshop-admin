import http from './httpService';

const apiEndpoint = '/orders';

export const getOrders = (token) =>
  http.get(apiEndpoint, { cancelToken: token });

export const getIncome = (token) =>
  http.get(`${apiEndpoint}/income`, { cancelToken: token });

export const getIncomeStats = (productID, token) =>
  http.get(`${apiEndpoint}/income?pid=${productID}`, { cancelToken: token });
