import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from './Navbar';
import Statusbar from './Statusbar';

const InnerView = ({ children, style, ...props }) => (
  <View style={[InnerView.styles.Container, style]} {...props}>
    {children}
  </View>
);

InnerView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.element),
    PropTypes.element,
  ]),
  style: PropTypes.any,
};

InnerView.styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginTop: Navbar.height + Statusbar.height,
  },
});

export default InnerView;