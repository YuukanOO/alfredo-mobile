import * as constants from './constants';
import * as actions from './actions';
import * as actionTypes from './actionTypes';
import * as colors from './colors';
import * as types from './types';
import * as storage from './storage';
import * as fetch from './fetch';
import * as selectors from './selectors';
import saga from './sagas';
import components from './components';
import reducer from './reducer';

export default {
  actions,
  actionTypes,
  ...components,
  constants,
  fetch,
  colors,
  types,
  reducer,
  selectors,
  storage,
  saga,
};
