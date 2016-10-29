import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Modal, StyleSheet, ScrollView } from 'react-native';
import base from './../../base';
import * as selectors from './../selectors';
import * as actions from './../actions';
import * as widgets from './../widgets';

const { Navbar, colors } = base;

const DeviceModal = ({
  device,
  modal: { visible, view },
  dispatch,
}) => (
  <Modal
    visible={visible}
    onRequestClose={() => dispatch(actions.hideDetailView())}
    animationType="fade"
  >
    <Navbar
      style={DeviceModal.styles.Navbar}
      title={device.name}
      titleColor={colors.primaryTextOnLightColor}
      navIconName="close"
      onIconClicked={() => dispatch(actions.hideDetailView())}
    />
    <ScrollView style={DeviceModal.styles.View}>
      {widgets.getWidget(device.adapter, view, device, dispatch, false)}
    </ScrollView>
  </Modal>
);

DeviceModal.propTypes = {
  device: PropTypes.shape({
    name: PropTypes.string,
    adapter: PropTypes.string,
  }),
  dispatch: PropTypes.func.isRequired,
  modal: PropTypes.shape({
    visible: PropTypes.bool,
    view: PropTypes.string,
  }),
};

DeviceModal.styles = StyleSheet.create({
  Navbar: {
    backgroundColor: '#F5F5F5',
    elevation: 4,
    top: 0,
  },
  View: {
    marginTop: Navbar.height,
  },
});

export default connect(createStructuredSelector({
  device: selectors.getCurrentDevice,
  modal: selectors.getModal,
}))(DeviceModal);
