import {combineReducers} from 'redux';

import profileReducer from './Profile';
import reposReducer from './Repos';
import entitiesReducer from './Entities';

export default combineReducers({
  profile: profileReducer,
  repos: reposReducer,
  entities: entitiesReducer,
});
