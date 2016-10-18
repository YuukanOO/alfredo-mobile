import React, { PropTypes } from 'react';
import { MKTextField } from 'react-native-material-kit';
import { Text, StyleSheet, TextInput } from 'react-native';
import base from './../../base';
import * as actions from './../actions';

const { InnerView, types } = base;

const Room = ({
  room: {
    id,
    name,
    editing,
  },
  dispatch,
}) => (
  <InnerView style={Room.styles.Container}>
    <MKTextField
      underlineEnabled={false}
      underlineColorAndroid="transparent"
      underlineSize={0}
      textInputStyle={Room.styles.Name}
      value={name}
      onChangeText={text => dispatch(actions.changeRoom(id, { name: text }))}
      onSubmitEditing={() => dispatch(actions.updateRoom.request(id))}
      editable={editing === true}
    />
  </InnerView>
);

Room.propTypes = {
  dispatch: PropTypes.func.isRequired,
  room: PropTypes.shape({
    editing: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

Room.styles = StyleSheet.create({
  Container: {
    marginLeft: 16,
    marginRight: 16,
  },
  Name: {
    color: '#ffffff',
    fontSize: types.titleFontSize,
    fontWeight: 'bold',
    height: 42,
  },
});

export default Room;
