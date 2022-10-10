import axios from 'axios';
import helpers from './axios.helper';

export const baseURL = 'http://127.0.0.1:8000/api/';

const _axios = axios.create({
  baseURL,
  // withCredentials: true,
});

const onRequest = (config) => {
  config = helpers.setTokenInHeader(config);
  return config;
};

const onRequestError = (error) => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response) => {
  // console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};

const onResponseError = async (error) => {
  if (error.response) {
    // Logout if unauthorized
    if (error.response.status === 401) {
    }
  }
  return Promise.reject(error);
};

export function setupInterceptorsTo(axiosInstance) {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

export default setupInterceptorsTo(_axios);
