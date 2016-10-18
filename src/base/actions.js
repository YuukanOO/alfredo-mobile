import * as t from './actionTypes';

export const formStartSubmit = (form, actionTypes, values) => ({
  type: t.FORM_START_SUBMIT,
  form,
  actionTypes,
  values,
});
export const createActions = actionTypes => ({
  request: payload => ({ type: actionTypes.REQUEST, payload }),
  success: payload => ({ type: actionTypes.SUCCESS, payload }),
  failure: payload => ({ type: actionTypes.FAILURE, payload }),
});
export const createFormActions = (formName, actionTypes) => ({
  formName,
  submit: values => formStartSubmit(formName, actionTypes, values),
  ...createActions(actionTypes),
});
export const applicationStarted = () => ({ type: t.APP_STARTED });
export const setStatusbar = payload => ({ type: t.SET_STATUS_BAR, payload });
