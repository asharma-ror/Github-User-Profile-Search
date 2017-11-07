import axios from 'axios';

export const PER_PAGE = 42;

const github = axios.create({
  baseURL: 'https://api.github.com/',
});

const token = process.env.USER_SEARCH_OAUTH;
if (token) {
  github.defaults.headers.common.Authorization = `token ${token}`;
}

const getProfile = (username: string) => {
  return github.get(`/users/${username}`);
}

export default {
  getProfile,
  get: github.get,
};
