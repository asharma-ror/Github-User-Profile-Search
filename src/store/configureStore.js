import {
  createStore,
  applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';

import rootReducer from '../reducers/Root';
import rootSaga from '../sagas';

const logger = createLogger({collapsed: true});
const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(
      logger,
      sagaMiddleware
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
}  

export default configureStore;
