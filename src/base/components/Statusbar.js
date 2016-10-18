import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { StatusBar } from 'react-native';
import * as selectors from './../selectors';

const Statusbar = ({
  state,
}) => <StatusBar {...state} />;

Statusbar.propTypes = {
  state: PropTypes.shape({ ...StatusBar.propTypes }),
};

const ConnectedStatusbar = connect(createStructuredSelector({
  state: selectors.getStatusbarState,
}))(Statusbar);

ConnectedStatusbar.height = 24;

export default ConnectedStatusbar;
