import React from 'react';
import Tile from './components/Tile';
import * as actions from './actions';

let loadedWidgets = {};

/**
 * Load the given widgets.
 */
export function parseWidgets(widgetsStr) {
  // eslint-disable-next-line no-eval
  loadedWidgets = eval.call(this, widgetsStr)({
    React,
    Tile,
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

  const detail = () => dispatch(actions.showDetailView(device.id));

  if (editing) {
    command = () => dispatch(actions.editDevice(device.id));
  }

  return adapterWidget(device, command, detail);
}
