import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { Actions, ActionConst } from 'react-native-router-flux';
import base from './../base';
import * as constants from './constants';
import * as actions from './actions';
import * as selectors from './selectors';
import * as t from './actionTypes';

/**
 * Upon connection, save the server information to the persistent storage and
 * redirect the user to the home page.
 */
function* onConnectedToServer({ payload }) {
  yield call(base.storage.setItem, constants.SERVER_STORAGE_KEY, payload);
  yield call(Actions[constants.ROOMS_SCENE_KEY], { type: ActionConst.RESET });
}

/**
 * Connect to the alfredo server specified by the payload.host property.
 *
 * @param {any} { payload: { host } }
 */
function* onConnectToServer({ payload: { host } }) {
  try {
    const server = selectors.getServerInfo(yield select());
    let token = server.token;

    // If no token could be retrieved, generates a new one
    if (!token) {
      token = yield call(
        base.fetch.post, `http://${host}/controllers`,
        { body: { uid: 'dev' } },
      );
    }

    const serverInfo = yield call(
      base.fetch.get, `http://${host}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    yield put(actions.connectToServer.success({
      ...serverInfo,
      token,
    }));
  } catch (e) {
    yield put(actions.connectToServer.failure(e));
  }
}

export default function* rootSaga() {
  yield [
    takeLatest(t.CONNECT_TO_SERVER.REQUEST, onConnectToServer),
    takeLatest(t.CONNECT_TO_SERVER.SUCCESS, onConnectedToServer),
  ];
}
