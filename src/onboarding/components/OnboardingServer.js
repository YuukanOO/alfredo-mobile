import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import { MKTextField, MKProgress } from 'react-native-material-kit';
import { Field, reduxForm } from 'redux-form';
import base from './../../base';
import OnboardingHome from './OnboardingHome';
import * as constants from './../constants';
import * as actions from './../actions';

const { Spacer, Button, colors } = base;

const description = 'Commencez par rentrer l\'adresse du serveur';

const ServerTextField = field => (
  <MKTextField
    placeholder="192.168.0.15"
    keyboardType="numeric"
    underlineColorAndroid="transparent"
    textInputStyle={OnboardingHome.styles.TextInput}
    highlightColor={colors.primaryColor}
    editable={!field.meta.submitting}
    {...field.input}
  />
);

const OnboardingServer = ({ handleSubmit, submitting }) => (
  <View style={OnboardingHome.styles.Container}>
    {submitting ?
      <MKProgress.Indeterminate
        style={OnboardingHome.styles.Progress}
        progressColor={colors.primaryColor}
      /> : null}

    <Spacer />

    <View style={OnboardingHome.styles.Content}>
      <Text style={OnboardingHome.styles.Title}>Serveur</Text>
      <Text style={OnboardingHome.styles.Description}>{description}</Text>
      <Field name="serverAddress" component={ServerTextField} />
    </View>

    <Spacer />

    <Button
      text="Connexion"
      disabled={submitting}
      onPress={handleSubmit}
      style={{ container: OnboardingHome.styles.Button }}
    />
  </View>
);

OnboardingServer.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const ConnectedOnboardingServer = reduxForm({
  form: constants.ONBOARDING_SERVER_FORM_NAME,
  onSubmit: (args, dispatch) => actions.connectToServer.request(args, dispatch),
})(OnboardingServer);

ConnectedOnboardingServer.renderNavigationBar = () => <View />;

export default ConnectedOnboardingServer;
