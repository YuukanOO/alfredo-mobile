import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const App = () => (
  <Provider store={configureStore()}>
    <View />
  </Provider>
);

App.styles = StyleSheet.create({
});

export default App;
