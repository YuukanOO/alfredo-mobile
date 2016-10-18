import * as t from './actionTypes';

const initialState = {
  statusbar: {
    translucent: true,
    backgroundColor: 'transparent',
    barStyle: 'light-content',
  },
};

export default function baseReducer(state = initialState, action) {
  switch (action.type) {
    case t.SET_STATUS_BAR:
      return {
        ...state,
        statusbar: {
          ...state.statusbar,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
