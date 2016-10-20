import React, { PropTypes } from 'react';
import { MKTextField } from 'react-native-material-kit';
import { Text, StyleSheet, Dimensions } from 'react-native';
import base from './../../base';
import * as actions from './../actions';

const { InnerView, types, colors } = base;

const noDevicesDescription = 'Vous n\'avez aucun accessoire dans cette pièce pour le moment. Passez en mode édition pour en ajouter !';

const Room = ({
  room: {
    id,
    name,
  },
  devices,
  editing,
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
    <Text style={Room.styles.SectionLabel}>Accessoires</Text>
    {devices.length === 0 ?
      <Text style={Room.styles.SectionText}>{noDevicesDescription}</Text>
    : null}
  </InnerView>
);

Room.propTypes = {
  dispatch: PropTypes.func.isRequired,
  devices: PropTypes.array,
  room: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  editing: PropTypes.bool,
};

Room.styles = StyleSheet.create({
  Container: {
    marginLeft: 16,
    marginRight: 16,
  },
  Name: {
    color: colors.primaryTextOnDarkColor,
    fontSize: types.titleFontSize,
    fontWeight: 'bold',
    height: 42,
  },
  SectionLabel: {
    color: colors.primaryTextOnDarkColor,
    fontSize: types.bodyFontSize,
    marginBottom: 16,
    marginTop: (Dimensions.get('window').height * 0.1),
    fontWeight: 'bold',
  },
  SectionText: {
    color: colors.secondaryTextOnDarkColor,
    fontSize: types.bodyFontSize,
  },
});

export default Room;
