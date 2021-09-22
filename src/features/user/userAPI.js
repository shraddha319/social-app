import API from '../api.config';

export const updateUser = (userId, token, update) => {
  return API.post(`/users/${userId}`, update);
};

export const getUserByUsername = (username) => {
  return API.get(`/users?username=${username}`);
};

export const getUser = (userId, token) => {
  return API.get(`/users/${userId}`);
};
