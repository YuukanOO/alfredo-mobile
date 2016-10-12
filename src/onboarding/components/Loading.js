import React from 'react';
import {
  View,
} from 'react-native';
import base from './../../base';

const { Navbar } = base;

const Loading = () => (
  <View />
);

Loading.renderNavigationBar = () => (
  <Navbar />
);

export default Loading;
