import _ from 'lodash';
import * as t from './actionTypes';
import * as constants from './constants';

const initialState = {
  server: {
    local: null,
    remote: null,
    version: null,
    token: null,
  },
  editing: false,
  currentRoom: null,
  rooms: {},
  devices: {},
  adapters: {},
  widgets: {},
  adaptersCategories: {},
  currentCategory: null,
  currentAdapter: null,
  currentDevice: null,
};

export default function houseReducer(state = initialState, action) {
  switch (action.type) {
    case t.DEVICE_COMMAND.SUCCESS:
      return {
        ...state,
        devices: {
          ...state.devices,
          [action.payload.device]: {
            ...state.devices[action.payload.device],
            status: action.payload.status,
          },
        },
      };
    case t.CONNECT_TO_SERVER.SUCCESS:
    case t.RESTORE_SERVER_INFO:
      return {
        ...state,
        server: {
          ...state.server,
          ...action.payload,
        },
      };
    case t.REGISTER_CONTROLLER.SUCCESS:
      return {
        ...state,
        server: {
          ...state.server,
          token: action.payload,
        },
      };
    case t.WIDGETS_LOADED:
      return { ...state, widgets: action.payload };
    case t.FETCH_ROOMS.SUCCESS:
      return {
        ...state,
        currentRoom: (action.payload.length > 0 ? action.payload[0].id : null),
        rooms: action.payload.reduce((prev, cur) => ({ ...prev, [cur.id]: cur }), {}),
      };
    case t.FETCH_DEVICES.SUCCESS:
      return {
        ...state,
        devices: action.payload.reduce((prev, cur) => ({ ...prev, [cur.id]: cur }), {}),
      };
    case t.FETCH_ADAPTERS.SUCCESS:
      return {
        ...state,
        adapters: action.payload.reduce((prev, cur) => ({ ...prev, [cur.id]: cur }), {}),
        adaptersCategories: action.payload.reduce((prev, cur) => {
          const categoryName = cur.category;

          if (!prev[categoryName]) {
            /* eslint-disable no-param-reassign */
            prev[categoryName] = [];
          }

          prev[categoryName].push(cur);

          return prev;
        }, {}),
      };
    case t.SET_CURRENT_ROOM:
      return { ...state, currentRoom: action.payload };
    case t.SET_EDIT_ROOMS:
      return {
        ...state,
        editing: action.payload,
        currentRoom: (!action.payload && state.currentRoom === constants.DRAFT_ROOM_ID) ?
          _.last(Object.keys(_.omit(state.rooms, constants.DRAFT_ROOM_ID))) : state.currentRoom,
        rooms: action.payload ? state.rooms : _.omit(state.rooms, constants.DRAFT_ROOM_ID),
      };
    case t.ADD_DRAFT_ROOM:
      return {
        ...state,
        currentRoom: constants.DRAFT_ROOM_ID,
        editing: true,
        rooms: {
          ...state.rooms,
          [constants.DRAFT_ROOM_ID]: { id: constants.DRAFT_ROOM_ID },
        },
      };
    case t.CHANGE_ROOM:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.id]: {
            ...state.rooms[action.id],
            ...action.payload,
          },
        },
      };
    case t.DELETE_ROOM.SUCCESS:
      return {
        ...state,
        currentRoom: _.last(Object.keys(_.omit(state.rooms, action.payload))),
        rooms: _.omit(state.rooms, action.payload),
      };
    case t.DRAFT_ROOM_SAVED:
      return {
        ...state,
        currentRoom: action.payload.id,
        rooms: {
          ..._.omit(state.rooms, constants.DRAFT_ROOM_ID),
          [action.payload.id]: action.payload,
        },
      };
    case t.UPDATE_ROOM.SUCCESS:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.payload.id]: {
            ...state.rooms[action.payload.id],
            ...action.payload,
          },
        },
      };
    case t.GO_TO_ADAPTERS:
      return { ...state, currentCategory: action.payload };
    case t.ADD_DEVICE:
      return { ...state, currentAdapter: action.payload, currentDevice: null };
    case t.EDIT_DEVICE:
      return {
        ...state,
        currentDevice: action.payload,
        currentAdapter: state.devices[action.payload].adapter,
      };
    case t.UPSERT_DEVICE.SUCCESS:
      return {
        ...state,
        devices: {
          ...state.devices,
          [action.payload.id]: action.payload,
        },
      };
    case t.DELETE_DEVICE.SUCCESS:
      return {
        ...state,
        devices: _.omit(state.devices, action.payload),
      };
    default:
      return state;
  }
}
