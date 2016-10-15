import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { startSubmit } from 'redux-form';
import * as t from './actionTypes';

function* onFormStartSubmit({ form, action }) {
  yield put(startSubmit(form));
  yield put(action);
}

export default function* rootSaga() {
  yield [
    takeLatest(t.FORM_START_SUBMIT, onFormStartSubmit),
  ];
}
