import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import base from './../base';
import * as constants from './constants';
import * as actions from './actions';
import * as t from './actionTypes';

function* onConnectedToServer({ payload }) {
  yield call(base.storage.setItem, constants.SERVER_STORAGE_KEY, payload);
}

function* onConnectToServer({ payload: { serverAddress } }) {
  try {
    const token = yield call(
        base.fetch.post,
      `http://${serverAddress}/controllers`,
      { body: { uid: 'dev' } },
    );
    const serverInfo = yield call(
      base.fetch.get,
      `http://${serverAddress}`,
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
