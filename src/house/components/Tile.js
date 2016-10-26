import React, { PropTypes } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import base from './../../base';

const { types, colors } = base;

const Tile = ({ text, icon, detail, onPress, iconColor, muted }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
    <View style={[Tile.styles.Container, muted ? Tile.styles.ContainerMuted : null]}>
      <Icon name={icon} style={[Tile.styles.Icon, { color: iconColor }]} />
      <Text numberOfLines={2} style={Tile.styles.Text}>{text}</Text>
      <Text numberOfLines={1} style={Tile.styles.Detail}>{detail}</Text>
    </View>
  </TouchableOpacity>
);

Tile.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  detail: PropTypes.string,
  muted: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

Tile.defaultProps = {
  iconColor: colors.iconInactiveOnLightColor,
};

Tile.styles = StyleSheet.create({
  Container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 8,
    width: (Dimensions.get('window').width - 48) / 3,
    height: (Dimensions.get('window').width - 48) / 3,
    elevation: 4,
    marginBottom: 8,
    marginRight: 8,
  },
  ContainerMuted: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  Text: {
    color: colors.primaryTextOnLightColor,
    fontSize: types.captionBodySize,
    flex: 1,
    fontWeight: 'bold',
  },
  Detail: {
    color: colors.secondaryTextOnLightColor,
    fontSize: types.captionBodySize,
  },
  Icon: {
    fontSize: 32,
  },
});

export default Tile;
