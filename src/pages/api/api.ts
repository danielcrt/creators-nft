import axios from 'axios'
import { refresh } from './user/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/';

const api = axios.create({
  withCredentials: true,
  baseURL: API_BASE_URL
})

// Response interceptor for API calls
api.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    
    const response = await refresh();
    if (response.networkError) {
      return Promise.reject(response.networkError);
    }
    return api(originalRequest);
  }
  return Promise.reject(error);
});

export default api;