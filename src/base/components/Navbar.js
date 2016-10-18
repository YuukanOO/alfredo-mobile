import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Statusbar from './Statusbar';

const Navbar = ({ title }) => (
  <Icon.ToolbarAndroid
    style={Navbar.styles.Container}
    title={title}
    titleColor="#ffffff"
    overflowIconName="more-vert"
    actions={[{ title: 'Settings', show: 'never' }]}
  />
);

Navbar.propTypes = {
  title: PropTypes.string,
};

Navbar.height = 56;

Navbar.styles = StyleSheet.create({
  Container: {
    position: 'absolute',
    height: Navbar.height,
    top: Statusbar.height,
    left: 0,
    right: 0,
  },
});

export default Navbar;
