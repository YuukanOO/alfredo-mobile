import { createSelector } from 'reselect';
import { NAME } from './constants';

export const getServerInfo = state => ({
  ...state[NAME].server,
  body: data => ({
    headers: {
      Authorization: (state[NAME].server && state[NAME].server.token) ? `Bearer ${state[NAME].server.token}` : null,
    },
    body: data,
  }),
});
export const getRawServerInfo = state => (state[NAME].server || {});
export const getRooms = state => state[NAME].rooms;
export const getRoomsArray = createSelector(getRooms, rooms => Object.values(rooms));
export const getDevices = state => state[NAME].devices;
export const getAdapters = state => state[NAME].adapters;
export const getCurrentRoom = createSelector(
    getRooms,
    state => state[NAME].currentRoom,
    (rooms, currentRoom) => rooms[currentRoom] || {}
);
