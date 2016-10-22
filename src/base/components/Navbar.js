import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Statusbar from './Statusbar';

const Navbar = ({ children, title, actions, style, ...props }) => (
  <Icon.ToolbarAndroid
    style={[Navbar.styles.Container, style]}
    title={title}
    titleColor="#ffffff"
    overflowIconName="more-vert"
    actions={actions}
    onActionSelected={idx => actions[idx].onPress()}
    {...props}
  >
    {children}
  </Icon.ToolbarAndroid>
);

Navbar.propTypes = {
  actions: PropTypes.array,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.element),
    PropTypes.element,
  ]),
  title: PropTypes.string,
  style: PropTypes.any,
};

Navbar.height = 56;

Navbar.styles = StyleSheet.create({
  Container: {
    flex: 1,
    position: 'absolute',
    height: Navbar.height,
    top: Statusbar.height,
    left: 0,
    right: 0,
  },
});

export default Navbar;
