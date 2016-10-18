import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { Actions, ActionConst } from 'react-native-router-flux';
import base from './../base';
import * as constants from './constants';
import * as actions from './actions';
import * as selectors from './selectors';
import * as t from './actionTypes';

/**
 * Synchronize every aspect of the house: Rooms, Devices and Adapters.
 */
function* sync() {
  const server = selectors.getServerInfo(yield select());

  try {
    const host = `http://${server.local}`;
    const opts = { headers: { Authorization: `Bearer ${server.token}` } };

    const adapters = yield call(base.fetch.get, `${host}/adapters`, opts);
    yield put(actions.fetchAdapters.success(adapters));

    const rooms = yield call(base.fetch.get, `${host}/rooms`, opts);
    yield put(actions.fetchRooms.success(rooms));

    const devices = yield call(base.fetch.get, `${host}/devices`, opts);
    yield put(actions.fetchDevices.success(devices));
  } catch (e) {
    console.error(e);
  }
}

/**
 * Upon connection, save the server information to the persistent storage and
 * redirect the user to the home page.
 */
function* onConnectedToServer({ payload }) {
  yield sync();

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
