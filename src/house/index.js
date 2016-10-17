import reducer from './reducer';
import * as constants from './constants';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import * as selectors from './selectors';
import components from './components';
import saga from './sagas';

export default {
  ...components,
  actions,
  actionTypes,
  constants,
  reducer,
  saga,
  selectors,
};
