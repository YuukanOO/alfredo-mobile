import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

const reducer = (state = {}) => state;

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
  );

  return store;
}
