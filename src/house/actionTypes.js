import { NAME } from './constants';
import base from './../base';

export const CONNECT_TO_SERVER = base.actionTypes.createActionTypes(`${NAME}/CONNECT_TO_SERVER`);
export const FETCH_ADAPTERS = base.actionTypes.createActionTypes(`${NAME}/FETCH_ADAPTERS`);
export const FETCH_ROOMS = base.actionTypes.createActionTypes(`${NAME}/FETCH_ROOMS`);
export const FETCH_DEVICES = base.actionTypes.createActionTypes(`${NAME}/FETCH_DEVICES`);
export const RESTORE_SERVER_INFO = `${NAME}/RESTORE_SERVER_INFO`;
export const SET_CURRENT_ROOM = `${NAME}/SET_CURRENT_ROOM`;
export const ADD_DRAFT_ROOM = `${NAME}/ADD_DRAFT_ROOM`;
export const CHANGE_ROOM = `${NAME}/CHANGE_ROOM`;
export const UPDATE_ROOM = base.actionTypes.createActionTypes(`${NAME}/UPDATE_ROOM`);
export const DELETE_ROOM = base.actionTypes.createActionTypes(`${NAME}/DELETE_ROOM`);
export const DRAFT_ROOM_SAVED = `${NAME}/DRAFT_ROOM_SAVED`;
export const SET_EDIT_ROOMS = `${NAME}/SET_EDIT_ROOMS`;
export const REGISTER_CONTROLLER = base.actionTypes.createActionTypes(`${NAME}/REGISTER_CONTROLLER`);
export const GO_TO_ADAPTERS_CATEGORIES = `${NAME}/GO_TO_ADAPTERS_CATEGORIES`;
export const GO_TO_ADAPTERS = `${NAME}/GO_TO_ADAPTERS`;
export const EDIT_DEVICE = `${NAME}/EDIT_DEVICE`;
export const ADD_DEVICE = `${NAME}/ADD_DEVICE`;
export const UPSERT_DEVICE = base.actionTypes.createActionTypes(`${NAME}/UPSERT_DEVICE`);
export const DELETE_DEVICE = base.actionTypes.createActionTypes(`${NAME}/DELETE_DEVICE`);
export const WIDGETS_LOADED = `${NAME}/WIDGETS_LOADED`;
export const DEVICE_COMMAND = base.actionTypes.createActionTypes(`${NAME}/DEVICE_COMMAND`);
