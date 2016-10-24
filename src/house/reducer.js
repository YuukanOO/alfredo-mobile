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
  adaptersCategories: {},
  currentCategory: null,
};

export default function houseReducer(state = initialState, action) {
  switch (action.type) {
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
      return { ...state, editing: action.payload };
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
    case t.DRAFT_ROOM_SAVED: // eslint-disable-line no-case-declarations
      const oldRooms = state.rooms;
      delete oldRooms[constants.DRAFT_ROOM_ID];
      return {
        ...state,
        currentRoom: action.payload.id,
        rooms: {
          ...oldRooms,
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
    default:
      return state;
  }
}
