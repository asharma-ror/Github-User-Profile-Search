import {GET_USER_PROFILE} from './actionTypes';

export const getUserProfile = (username) => ({type: GET_USER_PROFILE, payload: {username}});
