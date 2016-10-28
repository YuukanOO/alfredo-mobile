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
export const deleteRoom = base.actions.createActions(t.DELETE_ROOM);
export const draftRoomSaved = payload => ({ type: t.DRAFT_ROOM_SAVED, payload });
export const setEditRooms = payload => ({ type: t.SET_EDIT_ROOMS, payload });
export const registerController = base.actions.createActions(t.REGISTER_CONTROLLER);
export const goToAdaptersCategories = () => ({ type: t.GO_TO_ADAPTERS_CATEGORIES });
export const goToAdapters = payload => ({ type: t.GO_TO_ADAPTERS, payload });
export const editDevice = payload => ({ type: t.EDIT_DEVICE, payload });
export const addDevice = payload => ({ type: t.ADD_DEVICE, payload });
export const deleteDevice = base.actions.createFormActions(
  constants.DEVICE_FORM_NAME, t.DELETE_DEVICE
);
export const upsertDevice = base.actions.createFormActions(
  constants.DEVICE_FORM_NAME, t.UPSERT_DEVICE
);
export const widgetsLoaded = payload => ({ type: t.WIDGETS_LOADED, payload });
export const deviceCommand = base.actions.createActions(t.DEVICE_COMMAND);
export const showDetailView = payload => ({ type: t.SHOW_DEVICE_DETAIL_VIEW, payload });
export const hideDetailView = () => ({ type: t.HIDE_DEVICE_DETAIL_VIEW });
