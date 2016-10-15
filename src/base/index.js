import * as constants from './constants';
import * as actions from './actions';
import * as actionTypes from './actionTypes';
import * as colors from './colors';
import * as types from './types';
import * as storage from './storage';
import saga from './sagas';
import components from './components';

export default {
  actions,
  actionTypes,
  ...components,
  constants,
  colors,
  types,
  storage,
  saga,
};
