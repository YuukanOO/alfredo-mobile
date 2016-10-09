import { AsyncStorage } from 'react-native';

export const getItem = key => AsyncStorage.getItem(key).then(data => JSON.parse(data));
export const setItem = (key, data) => AsyncStorage.setItem(key, JSON.stringify(data));
