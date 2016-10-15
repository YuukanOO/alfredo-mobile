import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import base from './../../base';
import * as actions from './../actions';

const { colors, types, Button, Spacer } = base;

const description = 'Il semblerait que que vous n\'ayez aucun serveur Alfredo de configuré pour le moment. Prenons le temps de le faire ensemble !';

const OnboardingHome = ({ dispatch }) => (
  <View style={OnboardingHome.styles.Container}>

    <Spacer />

    <View style={OnboardingHome.styles.Content}>
      <Text style={OnboardingHome.styles.Title}>Hola!</Text>
      <Text style={OnboardingHome.styles.Description}>{description}</Text>
    </View>

    <Spacer />

    <Button
      text="Démarrer"
      onPress={() => dispatch(actions.startOnboarding())}
      style={{ container: OnboardingHome.styles.Button }}
    />
  </View>
);

OnboardingHome.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

OnboardingHome.styles = StyleSheet.create({
  Progress: {
    backgroundColor: colors.primaryColorLight,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  Button: {
    paddingBottom: 16,
    paddingTop: 16,
  },
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Content: {
    margin: 16,
  },
  Title: {
    color: colors.primaryTextOnLightColor,
    fontSize: types.titleFontSize,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Description: {
    color: colors.secondaryTextOnLightColor,
    fontSize: types.bodyFontSize,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  TextInput: {
    fontSize: types.bodyFontSize,
    textAlign: 'center',
  },
});

OnboardingHome.renderNavigationBar = () => <View />;

export default connect()(OnboardingHome);
