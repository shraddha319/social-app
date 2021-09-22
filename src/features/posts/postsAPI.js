import API from '../api.config';

export const getPosts = (userId) => {
  return API.get(`/users/${userId}/posts`);
};

export const getPost = (userId, postId) => {
  return API.get(`/users/${userId}/posts/${postId}`);
};

export const createPost = (userId, post) => {
  return API.post(`/users/${userId}/posts`, { content: post });
};

export const updatePost = ({ type, comment = null, postId, userId }) => {
  const reqBody = { type };
  if (comment) reqBody.comment = comment;
  return API.post(`/users/${userId}/posts/${postId}`, reqBody);
};
