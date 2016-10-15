import * as t from './actionTypes';
import * as constants from './constants';
import base from './../base';

export const startOnboarding = () => ({ type: t.START_ONBOARDING });
export const connectToServer = base.actions.createFormAction(
  constants.ONBOARDING_SERVER_FORM_NAME, t.CONNECT_TO_SERVER
);
