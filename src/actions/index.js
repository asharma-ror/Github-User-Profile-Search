import {GET_USER_PROFILE, GET_WEATHER} from './actionTypes';

export const getUserProfile = (username) => ({type: GET_USER_PROFILE, payload: {username}});

export const getWeather = (location, woeID) => ({type: GET_WEATHER, payload: {location, woeID}});
