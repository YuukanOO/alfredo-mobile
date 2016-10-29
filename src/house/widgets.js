import React from 'react';
import { View } from 'react-native';
import Tile from './components/Tile';
import base from './../base';
import * as actions from './actions';

const { RoundButton: Button } = base;

let loadedWidgets = {};

/**
 * Widget available components.
 */
export const WIDGET_API = '{ React, Tile, Button, View }';

/**
 * Load the given widgets.
 */
export function parseWidgets(widgetsStr) {
  // eslint-disable-next-line no-eval
  loadedWidgets = eval.call(this, widgetsStr)({
    React,
    Tile,
    Button,
    View,
  });
}
/**
 * Retrieve a widget ready to be displayed for the given adapter and view.
 */
export function getWidget(adapter, view, device, dispatch, editing) {
  const adapterWidget = loadedWidgets[`${adapter}_${view}`];

  if (!adapterWidget) {
    return null;
  }

  // This is the action that widgets can dispatch
  let command = (cmd, args) => dispatch(actions.deviceCommand.request({
    device: device.id,
    cmd,
    args,
  }));

  const showView = viewName => dispatch(actions.showDeviceView({
    device: device.id,
    view: viewName,
  }));

  if (editing) {
    command = () => dispatch(actions.editDevice(device.id));
  }

  return adapterWidget(device, command, showView);
}
