import http from './httpService';

const apiEndpoint = '/users';

export function getAllUsers() {
  return http.get(`${apiEndpoint}`);
}

export function getUsers() {
  return http.get(`${apiEndpoint}/?new=true`);
}

export function getUserStats() {
  return http.get(`${apiEndpoint}/stats`);
}

export function deleteUser(userId) {
  return http.delete(`${apiEndpoint}/${userId}`);
}
