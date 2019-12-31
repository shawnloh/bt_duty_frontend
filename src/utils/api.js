import { create } from 'apisauce';

const config = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
};
const api = create(config);

export default api;
