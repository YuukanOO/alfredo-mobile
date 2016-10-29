import React, { PropTypes } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as colors from './../colors';
import * as types from './../types';

const RoundButton = ({
  onPress, onLongPress,
  text, icon,
}) => (
  <TouchableOpacity
    onPress={onPress}
    onLongPress={onLongPress}
    style={RoundButton.styles.Touchable}
  >
    <View style={RoundButton.styles.View}>
      {icon ? <Icon style={RoundButton.styles.Icon} name={icon} /> : null}
      {text ? <Text style={RoundButton.styles.Text}>{text.toUpperCase()}</Text> : null}
    </View>
  </TouchableOpacity>
);

RoundButton.propTypes = {
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  text: PropTypes.string,
  icon: PropTypes.string,
};

RoundButton.styles = StyleSheet.create({
  Touchable: {
    alignSelf: 'flex-start',
  },
  View: {
    borderWidth: 1,
    borderColor: colors.dividerOnLightColor,
    borderRadius: 64,
    padding: 16,
    margin: 8,
  },
  Text: {
    color: colors.primaryTextOnLightColor,
    fontWeight: 'bold',
    fontSize: types.bodyFontSize,
  },
  Icon: {

  },
});

export default RoundButton;
