import * as t from './actionTypes';

const initialState = {
  widgets: {},
};

export default function onboardingReducer(state = initialState, action) {
  switch (action.type) {
    case t.WIDGETS_READY:
      return { ...state, widgets: action.widgets };
    default:
      return state;
  }
}
