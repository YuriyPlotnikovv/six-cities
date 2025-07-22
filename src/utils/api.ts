import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {Token} from './token';
import {toast} from 'react-toastify';

const BASE_URL = 'https://10.react.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = Token.get();

      if (!config.headers) {
        config.headers = {};
      }

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      toast.dismiss();
      toast.warn(
        String((error.response?.data as { error?: string })?.error ?? error.message)
      );
      return Promise.reject(error);
    }
  );

  return api;
};

export const api = createApi();

