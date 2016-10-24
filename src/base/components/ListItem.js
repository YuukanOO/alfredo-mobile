import React, { PropTypes } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import * as colors from './../colors';
import * as types from './../types';

const ListItem = ({
    onPress, text, detail, disabled,
}) => (
  <View style={ListItem.styles.Container}>
    <TouchableOpacity
      style={[ListItem.styles.Tile,
                detail ? ListItem.styles.TileMultiLine : ListItem.styles.TileSingleLine]}
      onPress={() => (disabled ? {} : onPress())}
    >
      <View style={ListItem.styles.View}>
        <Text
          style={[ListItem.styles.Text, (disabled ? ListItem.styles.TextDisabled : null)]}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {text}
        </Text>
        {detail ?
          <Text
            style={ListItem.styles.DetailText}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {detail}
          </Text> : null}
      </View>
    </TouchableOpacity>
  </View>
);

ListItem.propTypes = {
  detail: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  text: PropTypes.string,
};

ListItem.styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  View: {
    flex: 1,
  },
  ContainerWithDivider: {
    borderBottomColor: colors.dividerOnLightColor,
    borderBottomWidth: 1,
  },
  Icon: {
    color: colors.iconActiveOnLightColor,
    fontSize: 24,
    marginRight: 32,
  },
  Tile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  TileSingleLine: {
    height: 48,
  },
  TileMultiLine: {
    height: 72,
  },
  Text: {
    color: colors.primaryTextOnLightColor,
    fontSize: types.bodyFontSize,
  },
  TextDisabled: {
    color: colors.disabledTextOnLightColor,
  },
  DetailText: {
    color: colors.secondaryTextOnLightColor,
    fontSize: types.captionBodySize,
  },
});

export default ListItem;
