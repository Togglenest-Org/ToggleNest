import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

const request = async (promise) => {
  try {
    return (await promise).data;
  } catch (error) {
    return Promise.reject({
      message: error.response?.data?.message || error.message || 'Something went wrong. Please try again.',
      status: error.response?.status || 0,
    });
  }
};

const authConfig = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

const taskService = {
  list: (token) => request(api.get('/tasks', authConfig(token))),
  create: (payload, token) => request(api.post('/tasks', payload, authConfig(token))),
  update: (id, payload, token) => request(api.patch(`/tasks/${id}`, payload, authConfig(token))),
  remove: (id, token) => request(api.delete(`/tasks/${id}`, authConfig(token))),
};

export default taskService;
