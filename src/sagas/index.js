import {watchGetProfile} from './Profile';
import {watchGetRepos} from './Repos';

export default function* rootSaga() {
  yield [
    watchGetProfile(),
    watchGetRepos(),
  ];
}
