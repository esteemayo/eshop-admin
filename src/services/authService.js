import http from './httpService';
import { getFromStorage, tokenKey } from 'utils';

const apiEndpoint = '/auth';

export const login = (userData) =>
  http.post(`${apiEndpoint}/login`, userData);

export const register = (userData) =>
  http.post(`${apiEndpoint}/ register`, userData);

export const getJwt = () => getFromStorage(tokenKey)?.accessToken;
