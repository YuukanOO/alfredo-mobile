import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import base from './../base';
import * as constants from './constants';
import RNFS from 'react-native-fs';

export default function* rootSaga() {
  yield [
    takeLatest(base.actionTypes.APP_STARTED, onAppStarted),
  ];
}

function* onAppStarted() {
  try {
    // Retrieve the controller token
    const item = yield call(base.storage.getItem, constants.TOKEN_STORAGE_KEY);

    const path = `${RNFS.DocumentDirectoryPath}/test.js`;

    const result = yield call(RNFS.writeFile, path, "export Test = () => <Tile />");
  } catch(e) {

  }
}
