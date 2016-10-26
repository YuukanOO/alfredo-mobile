import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, StyleSheet, ViewPagerAndroid, Image, Alert } from 'react-native';
import base from './../../base';
import * as selectors from './../selectors';
import * as actions from './../actions';
import Room from './Room';

const { Navbar } = base;

/* eslint-disable global-require */

class Rooms extends Component {

  componentDidUpdate() {
    this.pager.setPage(this.props.rooms.indexOf(this.props.currentRoom));
  }

  render() {
    const { rooms, devices, editing, dispatch } = this.props;
    /* eslint-disable no-return-assign */
    return (
      <View style={Rooms.styles.Container}>
        <Image source={require('./../../../img/bg3.jpg')} style={Rooms.styles.BackgroundImage} />
        <ViewPagerAndroid
          ref={o => this.pager = o}
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
  }
}

Rooms.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentRoom: PropTypes.object,
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
  currentRoom: { id },
  editing,
  dispatch,
}) => (
  <Navbar
    actions={[
      {
        title: 'Ajouter une pièce',
        iconName: 'add',
        show: 'never',
        onPress: () => dispatch(actions.addDraftRoom()),
      },
      {
        title: 'Supprimer la pièce',
        iconName: 'delete',
        show: 'never',
        onPress: () => Alert.alert(
          'Supprimer',
          'Etes vous-sûr de vouloir supprimer cette pièce ?',
          [
            {
              text: 'Non',
            },
            {
              text: 'Oui',
              onPress: () => dispatch(actions.deleteRoom.request(id)),
            },
          ]
        ),
      },
    ].concat((editing === true) ?
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
    ])}
  />
);

RoomsNavbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentRoom: PropTypes.shape({
    id: PropTypes.string,
  }),
  editing: PropTypes.bool,
};

const ConnectedRoomsNavbar = connect(createStructuredSelector({
  editing: selectors.getEditing,
  currentRoom: selectors.getCurrentRoom,
}))(RoomsNavbar);

Rooms.renderNavigationBar = () => <ConnectedRoomsNavbar />;

export default connect(createStructuredSelector({
  rooms: selectors.getRoomsArray,
  currentRoom: selectors.getCurrentRoom,
  devices: selectors.getDevicesArray,
  editing: selectors.getEditing,
}))(Rooms);
