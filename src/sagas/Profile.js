import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import pick from 'lodash/fp/pick';
import get from 'lodash/fp/get';
import flow from 'lodash/fp/flow';

import api from './api';

const pickProfileData = flow(
  get('data'),
  pick([
    'avatar_url',
    'bio',
    'blog',
    'company',
    'followers',
    'followers_url',
    'following',
    'html_url',
    'location',
    'login',
    'id',
    'name',
    'public_gists',
    'public_repos',
    'repos_url',
  ])
);

function* requestAdditionalProfileData(data) {
  yield put({
    type: 'REPOS_REQUEST',
    payload: {
      url: data.repos_url,
    },
  });
  yield put({
    type: 'FOLLOWERS_REQUEST',
    payload: {
      url: data.followers_url,
    },
  });
}

function* requestWeatherData(data) {
  yield put({
    type: 'WEATHER_REQUEST',
    payload: {
      location: data.location,
    },
  });
}

export function* getProfile(action) {
  const {payload: {username}} = action
  let profile, isError = false;
  const meta = {fromCache: false};

  try {
    const response = yield call(api.getProfile, username);
    profile = pickProfileData(response);
  } catch (err) {
    isError = true;
    yield put({
      error: true,
      payload: err,
      type: 'PROFILE_FAILURE',
    });
  }

  if (!isError) {
    yield put({
      meta,
      payload: profile,
      type: 'PROFILE_SUCCESS',
    });
    yield* requestAdditionalProfileData(profile);
    yield* requestWeatherData(profile);
  }
}

export function* watchGetProfile() {
  yield takeLatest('PROFILE_REQUEST', getProfile);
}
