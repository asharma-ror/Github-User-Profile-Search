import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import api from './api';

import pick from 'lodash/fp/pick';
import get from 'lodash/fp/get';
import flow from 'lodash/fp/flow';

const pickWeatherData = flow(
  get('data'),
  pick([
    'timezone',
    'time',
    'sun_rise',
    'sun_set',
    'consolidated_weather',
  ])
);

export function* getWeather(action) {
  let {payload: {location, woeID}} = action;
  let weather, isError = false;
  const meta = {fromCache: false};
  try {
    if (!location) {
      throw ('Location not found');
    }
    if (!woeID) {
      const weatherAPIResponse = yield call(api.getWeather, location);
      if (weatherAPIResponse.data.length) {
        woeID = weatherAPIResponse.data[0].woeid;
      } else {
        throw ('Weather data not available for location');
      }
    }
    const locationAPIResponse = yield call(api.getLocationData, woeID);
    weather = {...pickWeatherData(locationAPIResponse), woeID}
  } catch (err) {
    yield put({
      error: true,
      payload: err,
      type: 'WEATHER_FAILURE',
    });
  }

  if (!isError) {
    console.warn("Data: ", weather);
    yield put({
      meta,
      payload: weather,
      type: 'WEATHER_SUCCESS',
    });
  }
}

export function* watchGetWeather() {
  yield takeLatest('WEATHER_REQUEST', getWeather);
}
