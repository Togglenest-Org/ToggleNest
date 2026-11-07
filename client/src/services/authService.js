import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

const handleResponse = (promise) =>
  promise.then((response) => response.data);

const handleError = (error) => {
  const message =
    error.response?.data?.message ||
    error.message ||
    'Something went wrong. Please try again.';
  const status = error.response?.status || 0;
  return Promise.reject({ message, status });
};

const authService = {
  login: async (credentials) => {
    return handleResponse(
      api.post('/auth/login', credentials).catch(handleError),
    );
  },
  register: async (payload) => {
    return handleResponse(
      api.post('/auth/register', payload).catch(handleError),
    );
  },
  me: async (token) => {
    return handleResponse(
      api
        .get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .catch(handleError),
    );
  },
};

export default authService;
