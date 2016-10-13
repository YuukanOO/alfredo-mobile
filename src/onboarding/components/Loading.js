import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  View,
  Text,
} from 'react-native';
import base from './../../base';
import * as selectors from './../selectors';

const { Navbar } = base;

const Loading = ({ widgets }) => {

  const wid = widgets.TVSamsung;

  if (wid) {
    return wid({ React, Text });
  }

  return (
    <View />
  );
};

Loading.renderNavigationBar = () => (
  <Navbar />
);

export default connect(createStructuredSelector({
  widgets: selectors.getWidgets,
}))(Loading);
