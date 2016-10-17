import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Navbar = () => (
  <Icon.ToolbarAndroid
    style={Navbar.styles.Container}
    title="Cuisine"
    overflowIconName="more-vert"
    actions={[{ title: 'Settings', show: 'never' }]}
  />
);

Navbar.height = 56;

Navbar.styles = StyleSheet.create({
  Container: {
    position: 'absolute',
    height: Navbar.height,
    top: 0,
    left: 0,
    right: 0,
  },
});

export default Navbar;
