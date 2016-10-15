import { NAME } from './constants';

/**
 * Creates action types for async actions.
 */
export const createActionTypes = actionType => ({
  REQUEST: `${actionType}_REQUEST`,
  SUCCESS: `${actionType}_SUCCESS`,
  FAILURE: `${actionType}_FAILURE`,
});

export const FORM_START_SUBMIT = `${NAME}/FORM_START_SUBMIT`;
export const APP_STARTED = `${NAME}/APP_STARTED`;
