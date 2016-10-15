import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'remote-redux-devtools';
import onboarding from './../onboarding';
import base from './../base';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = composeWithDevTools({ port: 8000 });

  const store = createStore(
    combineReducers({
      [onboarding.constants.NAME]: onboarding.reducer,
      form: formReducer,
    }),
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(onboarding.saga);
  sagaMiddleware.run(base.saga);

  return store;
}
