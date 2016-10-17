import saga from './sagas';
import * as constants from './constants';
import * as actions from './actions';
import * as actionTypes from './actionTypes';
import components from './components';

export default {
  actions,
  actionTypes,
  ...components,
  constants,
  saga,
};
