import axios from 'axios';

export const updateUser = (userId, token, update) => {
  return axios.post(`http://localhost:3001/users/${userId}`, update, {
    headers: {
      Authorization: token,
    },
  });
};

export const getUserByUsername = (username) => {
  return axios.get(`http://localhost:3001/users?username=${username}`);
};
