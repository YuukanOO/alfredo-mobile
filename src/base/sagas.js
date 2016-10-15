import { takeLatest } from 'redux-saga';
import { put, take, race } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';
import * as t from './actionTypes';

function* onFormStartSubmit({ form, actionTypes, values }) {
  yield put(startSubmit(form));
  yield put({ type: actionTypes.REQUEST, payload: values });

  const { success, failure } = yield race({
    success: take(actionTypes.SUCCESS),
    failure: take(actionTypes.FAILURE),
  });

  if (success) {
    yield put(stopSubmit(form));
  } else {
    yield put(stopSubmit(form, failure));
  }
}

export default function* rootSaga() {
  yield [
    takeLatest(t.FORM_START_SUBMIT, onFormStartSubmit),
  ];
}
