import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import base from './../base';
import * as constants from './constants';

function* onAppStarted() {
  try {
    // Retrieve the controller token
    const item = yield call(base.storage.getItem, constants.TOKEN_STORAGE_KEY);

    
  } catch(e) {

  }
}

export default function* rootSaga() {
  yield [
    takeLatest(base.actionTypes.APP_STARTED, onAppStarted),
  ];
}
