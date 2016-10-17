import { NAME } from './constants';

export const getServerInfo = state => state[NAME].server || {};
