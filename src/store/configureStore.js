import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'remote-redux-devtools';
import onboarding from './../onboarding';
import house from './../house';
import base from './../base';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = composeWithDevTools({ port: 8000 });

  const store = createStore(
    combineReducers({
      [house.constants.NAME]: house.reducer,
      [base.constants.NAME]: base.reducer,
      form: formReducer,
    }),
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(onboarding.saga);
  sagaMiddleware.run(house.saga);
  sagaMiddleware.run(base.saga);

  return store;
}
