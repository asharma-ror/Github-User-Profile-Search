import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import api from './api';
import {normalize} from 'normalizr';
import {
  repoSchema,
} from './schema';

function reposSuccessAction(data: Object, url: string, {fromCache = false} = {}) {
  return put({
    type: 'REPOS_SUCCESS',
    meta: {fromCache},
    payload: {
      entities: data.entities,
      result: data.result,
      url,
    },
  });
}

export function* getRepos(action) {
  const {payload: {url}} = action;

  try {
    const reposResponse = yield call(api.get, url, {
      params: {
        sort: 'pushed',
      },
    });
    const data = normalize(reposResponse.data, repoSchema);
    yield reposSuccessAction(data, url);
  } catch (err) {
    yield put({
      error: true,
      payload: err,
      type: 'REPOS_FAILURE',
    });
  }
}

export function* watchGetRepos() {
  yield takeLatest('REPOS_REQUEST', getRepos);
}
