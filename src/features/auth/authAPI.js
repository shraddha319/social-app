import axios from 'axios';

export const register = (user) => {
  return axios.post('http://localhost:3001/users', user);
};

export const login = (credentials) => {
  return axios.post('http://localhost:3001/auth/login', credentials);
};
