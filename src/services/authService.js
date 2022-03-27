import http from './httpService';

const apiEndpoint = '/auth';
const tokenKey = 'jwtToken';

http.setJWT(getJwt());

export function login(userData) {
  return http.post(`${apiEndpoint}/login`, userData);
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}
