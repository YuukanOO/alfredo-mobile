import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import base from './../../base';

const { InnerView } = base;

const Room = ({ room }) => (
  <InnerView>
    <Text>{room.id}</Text>
    <Text>Hello</Text>
  </InnerView>
);

Room.propTypes = {
  room: PropTypes.object.isRequired,
};

export default Room;
