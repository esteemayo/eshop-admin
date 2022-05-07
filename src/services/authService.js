import http from './httpService';

const apiEndpoint = '/auth';
const tokenKey = 'jwtToken';

export function login(userData) {
  return http.post(`${apiEndpoint}/login`, userData);
}

export function register(userData) {
  return http.post(`${apiEndpoint}/register`, userData);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}
