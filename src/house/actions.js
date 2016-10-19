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
export const addDraftRoom = () => ({ type: t.ADD_DRAFT_ROOM });
export const changeRoom = (id, payload) => ({ type: t.CHANGE_ROOM, id, payload });
export const updateRoom = base.actions.createActions(t.UPDATE_ROOM);
export const draftRoomSaved = payload => ({ type: t.DRAFT_ROOM_SAVED, payload });
export const setEditRoom = (id, payload) => ({ type: t.SET_EDIT_ROOM, id, payload });
export const registerController = base.actions.createActions(t.REGISTER_CONTROLLER);
