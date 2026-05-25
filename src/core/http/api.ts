import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuthStore } from '../auth/authStorage';
import { ROUTES_PATH } from '../routes/routes';
import { ApiError } from './apiErrors';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('jwt');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {

    const status = error.response?.status;
    const data = error.response?.data;
    const url = error.config?.url;

    const publicRoutes = ['/auth/access', '/auth/register'];

    if (
      status === 401 &&
      !publicRoutes.includes(url) &&
      typeof window !== 'undefined' &&
      window.location.pathname !== ROUTES_PATH.signin
    ) {

      Cookies.remove('jwt', { path: '/' });
      useAuthStore.getState().logout();

      window.location.replace(ROUTES_PATH.signin);
    }

    const normalizedError = new ApiError(
      data?.message || 'Unexpected error',
      status,
      data
    );

    return Promise.reject(normalizedError);
  }
);

export default api;