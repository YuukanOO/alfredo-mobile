import * as constants from './constants';
import * as t from './actionTypes';
import base from './../base';

export const connectToServer = base.actions.createFormAction(
  constants.ONBOARDING_SERVER_FORM_NAME, t.CONNECT_TO_SERVER
);
export const restoreServerInfo = payload => ({
  type: t.RESTORE_SERVER_INFO,
  payload,
});
