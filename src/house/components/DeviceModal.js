import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Modal, StyleSheet, ScrollView } from 'react-native';
import base from './../../base';
import * as selectors from './../selectors';
import * as actions from './../actions';

const { Navbar, colors } = base;

const DeviceModal = ({
  device: { name },
  modalVisible,
  dispatch,
}) => (
  <Modal
    visible={modalVisible}
    onRequestClose={() => dispatch(actions.hideDetailView())}
    animationType="fade"
  >
    <Navbar
      style={DeviceModal.styles.Navbar}
      title={name}
      titleColor={colors.primaryTextOnLightColor}
      navIconName="close"
      onIconClicked={() => dispatch(actions.hideDetailView())}
    />
    <ScrollView>
    </ScrollView>
  </Modal>
);

DeviceModal.propTypes = {
  device: PropTypes.shape({
    name: PropTypes.string,
  }),
  dispatch: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool,
};

DeviceModal.styles = StyleSheet.create({
  Navbar: {
    backgroundColor: '#F5F5F5',
    elevation: 4,
    top: 0,
  },
});

export default connect(createStructuredSelector({
  device: selectors.getCurrentDevice,
  modalVisible: selectors.getModalVisible,
}))(DeviceModal);
