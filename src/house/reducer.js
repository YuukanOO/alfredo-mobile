import * as t from './actionTypes';

const initialState = {
  server: {
    local: null,
    remote: null,
    version: null,
    token: null,
  },
};

export default function houseReducer(state = initialState, action) {
  switch (action.type) {
    case t.CONNECT_TO_SERVER.SUCCESS:
    case t.RESTORE_SERVER_INFO:
      return { ...state, server: action.payload };
    default:
      return state;
  }
}
