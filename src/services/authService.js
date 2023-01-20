import http from './httpService';
import { getFromStorage, tokenKey } from 'utils';

const apiEndpoint = '/auth';

export function login(userData) {
  return http.post(`${apiEndpoint}/login`, userData);
}

export function register(userData) {
  return http.post(`${apiEndpoint}/register`, userData);
}

export function getJwt() {
  return getFromStorage(tokenKey)?.accessToken;
}
