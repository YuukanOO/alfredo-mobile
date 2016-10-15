import React from 'react';
import { View, StyleSheet } from 'react-native';

const Spacer = () => <View style={Spacer.styles.Container} />;

Spacer.styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});

export default Spacer;
