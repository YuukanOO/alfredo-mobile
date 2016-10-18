import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, StyleSheet, ViewPagerAndroid } from 'react-native';
import base from './../../base';
import * as selectors from './../selectors';
import * as actions from './../actions';
import Room from './Room';

const { Navbar } = base;

/* eslint-disable global-require */

const Rooms = ({ rooms, dispatch }) => (
  <View style={Rooms.styles.Container}>
    <ViewPagerAndroid
      style={Rooms.styles.Container}
      onPageSelected={event =>
        dispatch(actions.setCurrentRoom(rooms[event.nativeEvent.position].id))}
      initialPage={0}
    >
      {rooms.map(o => <View key={o.id}><Room room={o} /></View>)}
    </ViewPagerAndroid>
  </View>
);

Rooms.propTypes = {
  dispatch: PropTypes.func.isRequired,
  rooms: PropTypes.array,
};

Rooms.styles = StyleSheet.create({
  Container: {
    backgroundColor: '#bbbbbb',
    flex: 1,
  },
  BackgroundImage: {
    position: 'absolute',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

const RoomsNavbar = ({ room: { name } }) => <Navbar title={name} />;

RoomsNavbar.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const ConnectedRoomsNavbar = connect(createStructuredSelector({
  room: selectors.getCurrentRoom,
}))(RoomsNavbar);

Rooms.renderNavigationBar = () => <ConnectedRoomsNavbar />;

export default connect(createStructuredSelector({
  rooms: selectors.getRoomsArray,
}))(Rooms);
