import http from './httpService';

const apiEndpoint = '/orders';

export const getOrders = () => http.get(apiEndpoint);

export const getIncome = () => http.get(`${apiEndpoint}/income`);

export const getIncomeStats = (productID) =>
  http.get(`${apiEndpoint}/income?pid=${productID}`);
