import { NAME } from './constants';
import base from './../base';

export const CONNECT_TO_SERVER = base.actionTypes.createActionTypes(`${NAME}/CONNECT_TO_SERVER`);
export const FETCH_ADAPTERS = base.actionTypes.createActionTypes(`${NAME}/FETCH_ADAPTERS`);
export const FETCH_ROOMS = base.actionTypes.createActionTypes(`${NAME}/FETCH_ROOMS`);
export const FETCH_DEVICES = base.actionTypes.createActionTypes(`${NAME}/FETCH_DEVICES`);
export const RESTORE_SERVER_INFO = `${NAME}/RESTORE_SERVER_INFO`;
export const SET_CURRENT_ROOM = `${NAME}/SET_CURRENT_ROOM`;
