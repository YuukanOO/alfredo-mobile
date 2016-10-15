import React, { PropTypes } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import * as types from './../types';
import * as colors from './../colors';

const Button = ({
  onPress,
  text,
  disabled,
  style: {
    touchable,
    container,
    text: textStyle,
  } = {},
}) => (
  <TouchableOpacity style={[Button.styles.Touchable, touchable]} onPress={onPress}>
    <View
      style={[Button.styles.Container,
                container,
                disabled ? Button.styles.ContainerDisabled : null,
            ]}
    >
      <Text
        style={[Button.styles.Text,
                  textStyle,
                  disabled ? Button.styles.TextDisabled : null,
                ]}
      >{text.toUpperCase()}</Text>
    </View>
  </TouchableOpacity>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.shape({
    touchable: PropTypes.any,
    container: PropTypes.any,
    text: PropTypes.any,
  }),
  text: PropTypes.string.isRequired,
};

Button.styles = StyleSheet.create({
  Touchable: {
    alignSelf: 'stretch',
  },
  Container: {
    backgroundColor: colors.primaryColor,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  ContainerDisabled: {
    backgroundColor: colors.dividerOnLightColor,
  },
  Text: {
    color: colors.textOnPrimaryColor,
    fontSize: types.bodyFontSize,
    fontWeight: 'bold',
  },
  TextDisabled: {
    color: colors.disabledTextOnLightColor,
  },
});

export default Button;
