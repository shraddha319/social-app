import API from '../api.config';

/**
 *
 * @param {Object: {
 * email: String,
 * password: String,
 * name: String,
 * username: String,
 * dob: String}} user
 */
export const register = (user) => {
  return API.post('/users', user);
};

/**
 *
 * @param {email: String, password: String, authToken: JWT} credentials
 */
export const login = (credentials) => {
  if (credentials.email && credentials.password)
    return API.post('/auth/login', credentials);
  else
    return API.post(
      '/auth/login',
      {},
      {
        headers: { Authorization: credentials.authToken },
      }
    );
};
