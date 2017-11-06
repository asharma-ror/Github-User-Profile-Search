import {combineReducers} from 'redux';

import searchReducer from './Search';
import profileReducer from './Profile';
import reposReducer from './Repos';
import entitiesReducer from './Entities';

export default combineReducers({
  search: searchReducer,
  profile: profileReducer,
  repos: reposReducer,
  entities: entitiesReducer,
});
