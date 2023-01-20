import http from './httpService';

const apiEndpoint = '/users';

function userUrl(userId) {
  return `${apiEndpoint}/${userId}`;
}

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
  return http.delete(userUrl(userId));
}
