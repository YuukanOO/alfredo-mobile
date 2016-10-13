import saga from './sagas';
import * as constants from './constants';
import * as actions from './actions';
import * as actionTypes from './actionTypes';
import components from './components';
import reducer from './reducer';
import * as selectors from './selectors';

export default {
  actions,
  actionTypes,
  ...components,
  constants,
  saga,
  reducer,
  selectors,
};
