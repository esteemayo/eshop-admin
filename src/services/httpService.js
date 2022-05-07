import axios from 'axios';
import { toast } from 'react-toastify';

import logger from './logService';
import { getJwt } from './authService';

const authFetch = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: 'application/json',
  },
});

authFetch.interceptors.request.use(
  (request) => {
    request.headers.common['Authorization'] = `Bearer ${getJwt()}`;
    return request;
  },
  (error) => {
    logger.log(error);
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(null, (err) => {
  const expectedError =
    err.response &&
    err.response.status >= 400 &&
    err.response &&
    err.response.status < 500;

  if (!expectedError) {
    logger.log(err);
    toast.error('An unexpected error occurred');
  }

  return Promise.reject(err);
});

const http = {
  get: authFetch.get,
  post: authFetch.post,
  patch: authFetch.patch,
  delete: authFetch.delete,
};

export default http;
