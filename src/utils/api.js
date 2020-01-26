import { create } from 'apisauce';

const api = create({
  baseURL: 'https://btdutyapp.herokuapp.com/api',
  withCredentials: true
});

export default api;
