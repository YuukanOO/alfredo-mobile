import * as t from './actionTypes';

export const formStartSubmit = (form, action) => ({
  type: t.FORM_START_SUBMIT,
  form,
  action,
});
export const createFormAction = (formName, actionTypes) => ({
  request: (values, dispatch) => dispatch(formStartSubmit(formName, {
    type: actionTypes.REQUEST,
    values,
  })),
});
export const applicationStarted = () => ({ type: t.APP_STARTED });
