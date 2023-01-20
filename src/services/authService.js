import http from './httpService';
import { tokenKey } from 'utils';

const apiEndpoint = '/auth';

export function login(userData) {
  return http.post(`${apiEndpoint}/login`, userData);
}

export function register(userData) {
  return http.post(`${apiEndpoint}/register`, userData);
}

export function getJwt() {
  return localStorage.getItem(tokenKey)?.accessToken;
}
