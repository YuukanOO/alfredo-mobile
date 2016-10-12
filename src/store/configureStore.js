import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import onboarding from './../onboarding';

const reducer = (state = {}) => state;

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(onboarding.saga);

  return store;
}
