import http from './httpService';

const apiEndpoint = '/users';

const userUrl = (userId) => `${apiEndpoint}/${userId}`;

export const getAllUsers = () => http.get(`${apiEndpoint}`);

export const getUsers = (token) =>
  http.get(`${apiEndpoint}/?new=true`, { cancelToken: token });

export const getUser = (userId) => http.get(userUrl(userId));

export const getUserStats = () => http.get(`${apiEndpoint}/stats`);

export const updateUser = (userId, user) =>
  http.patch(userUrl(userId), user);

export const deleteUser = (userId) => http.delete(userUrl(userId));
