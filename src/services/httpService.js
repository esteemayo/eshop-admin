import axios from 'axios';
import { toast } from 'react-toastify';

import logger from './logService';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (err) => {
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

const setJWT = (jwtToken) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
};

const http = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  delete: axios.delete,
  setJWT,
};

export default http;
