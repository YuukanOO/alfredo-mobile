import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from './Navbar';

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
    marginTop: Navbar.height,
  },
});

export default InnerView;
