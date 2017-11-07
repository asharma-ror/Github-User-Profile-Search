import axios from 'axios';

const github = axios.create({
  baseURL: 'https://api.github.com/',
});

const metaweather = axios.create({
  baseURL: 'https://cors.io/?https://www.metaweather.com/api/',
});

const token = process.env.GIT_KEY;
if (token) {
  github.defaults.headers.common.Authorization = `token ${token}`;
}

const getProfile = (username: string) => {
  return github.get(`/users/${username}`);
}

const getWeather = (location: string) => {
  return metaweather.get(`/location/search/?query=${location}`);
}

const getLocationData = (ID) => {
  return metaweather.get(`/location/${ID}`);
}

export default {
  getProfile,
  getWeather,
  getLocationData,
  get: github.get,
};
