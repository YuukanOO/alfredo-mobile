import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import RNFS from 'react-native-fs';
import base from './../base';
import * as actions from './actions';
import * as constants from './constants';

function* onAppStarted() {
  try {
    // Retrieve the controller token
    const item = yield call(base.storage.getItem, constants.TOKEN_STORAGE_KEY);

    // This is just for prototyping
    const path = `${RNFS.DocumentDirectoryPath}/test.js`;

    // This file will be retrieved via the alfredo server which contains widget definitions
    yield call(RNFS.writeFile, path, 'module.exports = { TVSamsung: ({ React, Text }) => React.createElement(Text, null, "Hello, world And so on") }');

    const tt = eval(yield call(RNFS.readFile, path));

    yield put(actions.widgetsReady(tt));
  } catch (e) {
    console.log(e);
  }
}

export default function* rootSaga() {
  yield [
    takeLatest(base.actionTypes.APP_STARTED, onAppStarted),
  ];
}
