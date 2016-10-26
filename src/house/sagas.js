import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { Actions, ActionConst } from 'react-native-router-flux';
import base from './../base';
import * as constants from './constants';
import * as actions from './actions';
import * as selectors from './selectors';
import * as t from './actionTypes';
import * as widgets from './widgets';

/**
 * Synchronize every aspect of the house: Rooms, Devices and Adapters.
 */
function* sync() {
  const server = selectors.getServerInfo(yield select());

  try {
    const adapters = yield call(base.fetch.get, ...server.request('adapters'));
    yield put(actions.fetchAdapters.success(adapters));

    let widgetsToEval = '(function({ React, Tile }) { return {';

    // Now we must eval widgets
    for (const adapter of adapters) {
      for (const widget in adapter.widgets) {
        const widgetName = `'${adapter.id}_${widget}'`;
        let widgetObj = adapter.widgets[widget];

        if (widgetObj.endsWith(';')) {
          widgetObj = widgetObj.substring(0, widgetObj.length - 1);
        }

        widgetsToEval += `${widgetName}: ${widgetObj},`;
      }
    }

    widgetsToEval += '};})';

    widgets.parseWidgets(widgetsToEval);

    const rooms = yield call(base.fetch.get, ...server.request('rooms'));
    yield put(actions.fetchRooms.success(rooms));

    if (rooms.length === 0) {
      yield put(actions.addDraftRoom());
    }

    const devices = yield call(base.fetch.get, ...server.request('devices'));
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
 * Try to register a device on the server.
 */
function* onUpsertDevice({ payload }) {
  try {
    const state = yield select();
    const server = selectors.getServerInfo(state);
    const room = selectors.getCurrentRoom(state);
    const adapter = selectors.getCurrentAdapter(state);
    const device = selectors.getCurrentDevice(state);

    let result = null;

    if (device && device.id) {
      result = yield call(
        base.fetch.put,
        ...server.request(`devices/${device.id}`, {
          ...device,
          ...payload,
        })
      );
    } else {
      result = yield call(
        base.fetch.post,
        ...server.request('devices', {
          ...payload,
          room_id: room.id,
          adapter: adapter.id,
        })
      );
    }

    yield put(actions.upsertDevice.success(result));
  } catch (e) {
    yield put(actions.upsertDevice.failure(e));
  }
}

/**
 * Deletes a device.
 */
function* onDeleteDevice({ payload }) {
  try {
    const server = selectors.getServerInfo(yield select());

    yield call(
      base.fetch.del,
      ...server.request(`devices/${payload}`)
    );

    yield put(actions.deleteDevice.success(payload));
  } catch (e) {
    yield put(actions.deleteDevice.failure(e));
  }
}

/**
 * Called when a device command should be send to the server.
 */
function* onDeviceCommand({ payload: { device, cmd, args } }) {
  try {
    const server = selectors.getServerInfo(yield select());

    const result = yield call(
      base.fetch.put,
      ...server.request(`devices/${device}/${cmd}`, args)
    );

    yield put(actions.deviceCommand.success(result));
  } catch (e) {
    yield put(actions.deviceCommand.failure(e));
  }
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
      base.fetch.get, ...server.request(),
    );

    yield put(actions.connectToServer.success(serverInfo));
  } catch (e) {
    yield put(actions.connectToServer.failure(e));
  }
}

/**
 * When a room has been updated, create or update it on the server.
 */
function* onRoomUpdated() {
  try {
    const state = yield select();
    const server = selectors.getServerInfo(state);
    const room = selectors.getCurrentRoom(state);

    if (room.id === constants.DRAFT_ROOM_ID) {
      // We need to update the draft room given our new one now!
      yield put(actions.draftRoomSaved(yield call(
        base.fetch.post, ...server.request('rooms', room)
      )));
    } else {
      yield put(actions.updateRoom.success(yield call(
        base.fetch.put, ...server.request(`rooms/${room.id}`, room)
      )));
    }
  } catch (e) {
    console.error(e);
  }
}

export function* onGoToCategories() {
  yield call(Actions[constants.CATEGORIES_SCENE_KEY]);
}

export function* onGoToAdapters() {
  yield call(Actions[constants.ADAPTERS_SCENE_KEY]);
}

export function* onGoToDevice() {
  yield call(Actions[constants.DEVICE_SCENE_KEY]);
}

export function* onUpsertedDevice() {
  yield call(Actions[constants.ROOMS_SCENE_KEY], { type: ActionConst.RESET });
}

export default function* rootSaga() {
  yield [
    takeLatest(t.CONNECT_TO_SERVER.REQUEST, onConnectToServer),
    takeLatest(t.CONNECT_TO_SERVER.SUCCESS, onConnectedToServer),
    takeLatest(t.UPSERT_DEVICE.REQUEST, onUpsertDevice),
    takeLatest(t.UPSERT_DEVICE.SUCCESS, onUpsertedDevice),
    takeLatest(t.UPDATE_ROOM.REQUEST, onRoomUpdated),
    takeLatest(t.REGISTER_CONTROLLER.SUCCESS, onControllerRegistered),
    takeLatest(t.GO_TO_ADAPTERS_CATEGORIES, onGoToCategories),
    takeLatest(t.GO_TO_ADAPTERS, onGoToAdapters),
    takeLatest(t.EDIT_DEVICE, onGoToDevice),
    takeLatest(t.ADD_DEVICE, onGoToDevice),
    takeLatest(t.DEVICE_COMMAND.REQUEST, onDeviceCommand),
    takeLatest(t.DELETE_DEVICE.REQUEST, onDeleteDevice),
    takeLatest(t.DELETE_DEVICE.SUCCESS, onUpsertedDevice),
  ];
}
