import React, { PropTypes } from 'react';
import { MKTextField } from 'react-native-material-kit';
import { Text, StyleSheet, Dimensions, View } from 'react-native';
import base from './../../base';
import * as actions from './../actions';
import * as constants from './../constants';
import * as widgets from './../widgets';
import Tile from './Tile';

const { InnerView, types, colors } = base;

const noDevicesDescription = 'Vous n\'avez aucun accessoire dans cette pièce pour le moment. Passez en mode édition pour en ajouter !';
const mustSaveRoom = 'Vous devez donner un nom à la pièce avant de pouvoir ajouter des accessoires';

/* eslint-disable no-nested-ternary */

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
      placeholder="Ma pièce"
      placeholderTextColor={colors.disabledTextOnDarkColor}
      onChangeText={text => dispatch(actions.changeRoom(id, { name: text }))}
      onSubmitEditing={() => dispatch(actions.updateRoom.request(id))}
      editable={editing === true}
    />
    <Text style={Room.styles.SectionLabel}>Accessoires</Text>
    {id === constants.DRAFT_ROOM_ID ?
      <Text style={Room.styles.SectionText}>{mustSaveRoom}</Text> : null}
    {!editing && id !== constants.DRAFT_ROOM_ID && devices.length === 0 ?
      <Text style={Room.styles.SectionText}>{noDevicesDescription}</Text> : null}

    <View style={Room.styles.TileContainer}>
      {devices.map(device => widgets.getWidget(device.adapter, 'tile', device, dispatch))}
      {editing && id !== constants.DRAFT_ROOM_ID ?
        <Tile
          text="Ajouter un accessoire"
          icon="add"
          onPress={() => dispatch(actions.goToAdaptersCategories())}
        />
      : null}
    </View>
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
  TileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    flexWrap: 'wrap',
  },
});

export default Room;
