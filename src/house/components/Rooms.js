import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, StyleSheet, ViewPagerAndroid, Image } from 'react-native';
import base from './../../base';
import * as selectors from './../selectors';
import * as actions from './../actions';
import Room from './Room';

const { Navbar } = base;

/* eslint-disable global-require */

const Rooms = ({ rooms, devices, editing, dispatch }) => (
  <View style={Rooms.styles.Container}>
    <Image source={require('./../../../img/bg3.jpg')} style={Rooms.styles.BackgroundImage} />
    <ViewPagerAndroid
      style={Rooms.styles.Container}
      onPageSelected={event =>
        dispatch(actions.setCurrentRoom(rooms[event.nativeEvent.position].id))}
      initialPage={0}
    >
      {rooms.map(o => (
        <View key={o.id}>
          <Room
            room={o}
            dispatch={dispatch}
            devices={devices.filter(d => d.room_id === o.id)}
            editing={editing}
          />
        </View>
      ))}
    </ViewPagerAndroid>
  </View>
);

Rooms.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editing: PropTypes.bool,
  rooms: PropTypes.array,
  devices: PropTypes.array,
};

Rooms.styles = StyleSheet.create({
  EmptyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  Container: {
    flex: 1,
  },
  BackgroundImage: {
    position: 'absolute',
    resizeMode: 'contain',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: 'center',
  },
});

const RoomsNavbar = ({
  editing,
  dispatch,
}) => (
  <Navbar
    actions={(editing === true) ?
    [
      {
        title: 'Terminer',
        iconName: 'check',
        show: 'always',
        onPress: () => dispatch(actions.setEditRooms(false)),
      },
    ]
    : [
      {
        title: 'Editer',
        iconName: 'edit',
        show: 'always',
        onPress: () => dispatch(actions.setEditRooms(true)),
      },
    ]}
  />
);

RoomsNavbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editing: PropTypes.bool,
};

const ConnectedRoomsNavbar = connect(createStructuredSelector({
  editing: selectors.getEditing,
}))(RoomsNavbar);

Rooms.renderNavigationBar = () => <ConnectedRoomsNavbar />;

export default connect(createStructuredSelector({
  rooms: selectors.getRoomsArray,
  devices: selectors.getDevicesArray,
  editing: selectors.getEditing,
}))(Rooms);
