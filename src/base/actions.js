import * as t from './actionTypes';

export const formStartSubmit = (form, actionTypes, values) => ({
  type: t.FORM_START_SUBMIT,
  form,
  actionTypes,
  values,
});
export const createFormAction = (formName, actionTypes) => ({
  submit: values => formStartSubmit(formName, actionTypes, values),
  request: payload => ({ type: actionTypes.REQUEST, payload }),
  success: payload => ({ type: actionTypes.SUCCESS, payload }),
  failure: payload => ({ type: actionTypes.FAILURE, payload }),
});
export const applicationStarted = () => ({ type: t.APP_STARTED });
