import { create } from 'apisauce';

const api = create({
  baseURL: '/api',
  withCredentials: true
});

export default api;
