import * as t from './actionTypes';
import * as colors from './colors';

const initialState = {
  statusbar: {
    translucent: true,
    backgroundColor: colors.primaryColorDark,
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
