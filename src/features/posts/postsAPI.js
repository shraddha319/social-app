import axios from 'axios';

export const getPosts = (userId, token) => {
  return axios.get(`http://localhost:3001/users/${userId}/posts`, {
    headers: {
      Authorization: token,
    },
  });
};

export const createPostAPI = (userId, token, post) => {
  return axios.post(
    `http://localhost:3001/users/${userId}/posts`,
    { content: post },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};
