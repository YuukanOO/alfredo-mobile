import * as constants from './constants';
import * as t from './actionTypes';
import base from './../base';

export const connectToServer = base.actions.createFormActions(
  constants.ONBOARDING_SERVER_FORM_NAME, t.CONNECT_TO_SERVER
);
export const fetchAdapters = base.actions.createActions(t.FETCH_ADAPTERS);
export const fetchRooms = base.actions.createActions(t.FETCH_ROOMS);
export const fetchDevices = base.actions.createActions(t.FETCH_DEVICES);
export const restoreServerInfo = payload => ({
  type: t.RESTORE_SERVER_INFO,
  payload,
});
export const setCurrentRoom = payload => ({ type: t.SET_CURRENT_ROOM, payload });
