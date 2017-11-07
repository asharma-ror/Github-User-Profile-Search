import {watchGetProfile} from './Profile';
import {watchGetRepos} from './Repos';
import {watchGetWeather} from './Weather';

export default function* rootSaga() {
  yield [
    watchGetProfile(),
    watchGetRepos(),
    watchGetWeather(),
  ];
}
