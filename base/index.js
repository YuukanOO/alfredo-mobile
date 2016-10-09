import * as constants from './constants';
import * as actions from './actions';
import * as actionTypes from './actionTypes';
import * as colors from './colors';
import * as storage from './storage';
import components from './components';

export default {
  actions,
  actionTypes,
  ...components,
  constants,
  colors,
  storage,
};
