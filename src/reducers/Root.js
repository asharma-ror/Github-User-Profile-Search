import {combineReducers} from 'redux';

import profileReducer from './Profile';
import reposReducer from './Repos';
import entitiesReducer from './Entities';
import weatherReducer from './Weather';

export default combineReducers({
  profile: profileReducer,
  repos: reposReducer,
  entities: entitiesReducer,
  weather: weatherReducer,
});
