import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from './Navbar';
import Statusbar from './Statusbar';

const InnerView = ({ children, ...props }) => (
  <View style={InnerView.styles.Container} {...props}>
    {children}
  </View>
);

InnerView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.element),
    PropTypes.element,
  ]),
};

InnerView.styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginTop: Navbar.height + Statusbar.height,
  },
});

export default InnerView;
