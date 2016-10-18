import * as t from './actionTypes';

const initialState = {
  server: {
    local: null,
    remote: null,
    version: null,
    token: null,
  },
  currentRoom: null,
  rooms: {},
  devices: {},
  adapters: {},
};

export default function houseReducer(state = initialState, action) {
  switch (action.type) {
    case t.CONNECT_TO_SERVER.SUCCESS:
    case t.RESTORE_SERVER_INFO:
      return { ...state, server: action.payload };
    case t.FETCH_ROOMS.SUCCESS:
      return {
        ...state,
        rooms: action.payload.reduce((prev, cur) => ({ ...prev, [cur.id]: cur }), {}),
        currentRoom: action.payload.length > 0 ? action.payload[0].id : null,
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
      };
    case t.SET_CURRENT_ROOM:
      return { ...state, currentRoom: action.payload };
    default:
      return state;
  }
}
