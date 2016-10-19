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
    const host = server.local;
    const opts = { headers: { Authorization: `Bearer ${server.token}` } };

    const adapters = yield call(base.fetch.get, `${host}/adapters`, opts);
    yield put(actions.fetchAdapters.success(adapters));

    const rooms = yield call(base.fetch.get, `${host}/rooms`, opts);
    yield put(actions.fetchRooms.success(rooms));

    if (rooms.length === 0) {
      yield put(actions.addDraftRoom());
    }

    const devices = yield call(base.fetch.get, `${host}/devices`, opts);
    yield put(actions.fetchDevices.success(devices));
  } catch (e) {
    console.error(e);
  }
}

/**
 * Upon controller registration, persist server informations.
 */
function* onControllerRegistered() {
  yield call(base.storage.setItem, constants.SERVER_STORAGE_KEY,
    selectors.getRawServerInfo(yield select()));
}

/**
 * Upon connection, save the server information to the persistent storage and
 * redirect the user to the home page.
 */
function* onConnectedToServer() {
  yield sync();
  yield onControllerRegistered();

  yield call(Actions[constants.ROOMS_SCENE_KEY], { type: ActionConst.RESET });
  yield put(base.actions.setStatusbar({ backgroundColor: 'transparent' }));
}

/**
 * Connect to the alfredo server specified by the payload.host property.
 *
 * @param {any} { payload: { host } }
 */
function* onConnectToServer({ payload: { host } }) {
  try {
    let server = selectors.getServerInfo(yield select());
    let token = server.token;

    // If no token could be retrieved, generates a new one
    if (!token) {
      token = yield call(
        base.fetch.post, `${host}/controllers`,
        { body: { uid: 'dev' } },
      );

      // Sets the token and refresh the server object use to query subsequent resources
      yield put(actions.registerController.success(token));

      server = selectors.getServerInfo(yield select());
    }

    const serverInfo = yield call(
      base.fetch.get, host,
      server.body(),
    );

    yield put(actions.connectToServer.success(serverInfo));
  } catch (e) {
    yield put(actions.connectToServer.failure(e));
  }
}

function* onRoomUpdated() {
  try {
    const state = yield select();
    const server = selectors.getServerInfo(state);
    const room = selectors.getCurrentRoom(state);

    if (room.id === constants.DRAFT_ROOM_ID) {
      // We need to update the draft room given our new one now!
      yield put(actions.draftRoomSaved(yield call(
        base.fetch.post, `${server.local}/rooms`,
        server.body(room)
      )));
    } else {
      yield put(actions.updateRoom.success(yield call(
        base.fetch.put, `${server.local}/rooms/${room.id}`,
        server.body(room)
      )));
    }
  } catch (e) {
    console.error(e);
  }
}

export default function* rootSaga() {
  yield [
    takeLatest(t.CONNECT_TO_SERVER.REQUEST, onConnectToServer),
    takeLatest(t.CONNECT_TO_SERVER.SUCCESS, onConnectedToServer),
    takeLatest(t.UPDATE_ROOM.REQUEST, onRoomUpdated),
    takeLatest(t.REGISTER_CONTROLLER.SUCCESS, onControllerRegistered),
  ];
}
