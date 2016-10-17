import React from 'react';
import { Text } from 'react-native';
import base from './../../base';

const { Navbar, InnerView } = base;

const Rooms = () => (
  <InnerView>
    <Text>Welcome home!</Text>
  </InnerView>
);

Rooms.renderNavigationBar = () => <Navbar />;

export default Rooms;
