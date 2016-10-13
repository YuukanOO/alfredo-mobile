import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import onboarding from './../onboarding';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    combineReducers({
      [onboarding.constants.NAME]: onboarding.reducer,
    }),
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(onboarding.saga);

  return store;
}
