import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { Actions, ActionConst } from 'react-native-router-flux';
import base from './../base';
import * as constants from './constants';
import * as t from './actionTypes';
import house from './../house';

/**
 * On application start, retrieve the server storage key. If it exists, launch the connect process,
 * otherwise, redirect to the onboarding scene.
 */
function* onAppStarted() {
  const server = yield call(base.storage.getItem, house.constants.SERVER_STORAGE_KEY);

  yield put(house.actions.restoreServerInfo(server));

  if (!server) {
    yield call(Actions[constants.ONBOARDING_HOME_SCENE_KEY], { type: ActionConst.RESET });
  } else {
    yield put(house.actions.connectToServer.request({ host: server.local }));
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
