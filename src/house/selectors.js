import { createSelector } from 'reselect';
import { NAME } from './constants';

export const getRawServerInfo = state => (state[NAME].server || {});
export const getServerInfo = createSelector(
  getRawServerInfo,
  serverInfo => ({
    ...serverInfo,
    request: (path, body) => [
      `${serverInfo.local}/${path}`,
      {
        headers: {
          Authorization: (serverInfo && serverInfo.token) ? `Bearer ${serverInfo.token}` : null,
        },
        body,
      },
    ],
  })
);
export const getRooms = state => state[NAME].rooms;
export const getRoomsArray = createSelector(getRooms, rooms => Object.values(rooms));
export const getDevices = state => state[NAME].devices;
export const getAdapters = state => state[NAME].adapters;
export const getEditing = state => state[NAME].editing;
export const getCurrentRoom = createSelector(
    getRooms,
    state => state[NAME].currentRoom,
    (rooms, currentRoom) => rooms[currentRoom] || {}
);
