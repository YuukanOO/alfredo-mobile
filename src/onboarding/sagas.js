import { takeLatest } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { Actions, ActionConst } from 'react-native-router-flux';
import base from './../base';
import * as constants from './constants';
import * as t from './actionTypes';

function* onAppStarted() {
  const server = yield call(base.storage.getItem, constants.SERVER_STORAGE_KEY);

  if (!server) {
    yield call(Actions[constants.ONBOARDING_HOME_SCENE_KEY], { type: ActionConst.RESET });
  } else {
    // TODO redirect to home page
  }
}

function* onStartOnboarding() {
  yield call(Actions[constants.ONBOARDING_SERVER_SCENE_KEY]);
}

export default function* rootSaga() {
  yield [
    takeLatest(base.actionTypes.APP_STARTED, onAppStarted),
    takeLatest(t.START_ONBOARDING, onStartOnboarding),
  ];
}
