import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { MKProgress } from 'react-native-material-kit';
import Navbar from './Navbar';
import Statusbar from './Statusbar';
import * as colors from './../colors';

const InnerView = ({ children, loading, style, ...props }) => (
  <View style={[InnerView.styles.Container, style]} {...props}>
    <View>
      {children}
    </View>
    {loading ?
      <MKProgress.Indeterminate
        style={InnerView.styles.Progress}
        progressColor={colors.primaryColor}
      /> : null}
  </View>
);

InnerView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.element),
    PropTypes.element,
  ]),
  loading: PropTypes.bool,
  style: PropTypes.any,
};

InnerView.styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginTop: Navbar.height + Statusbar.height,
  },
  Progress: {
    backgroundColor: colors.primaryColorLight,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

export default InnerView;
