import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import { MKTextField, MKProgress } from 'react-native-material-kit';
import { Field, reduxForm } from 'redux-form';
import base from './../../base';
import house from './../../house';
import OnboardingHome from './OnboardingHome';

const { Spacer, Button, colors } = base;

const description = 'Commencez par rentrer l\'adresse du serveur';

const ServerTextField = field => (
  <MKTextField
    placeholder="http://192.168.0.15:8080"
    underlineColorAndroid="transparent"
    textInputStyle={OnboardingHome.styles.TextInput}
    highlightColor={colors.primaryColor}
    editable={!field.meta.submitting}
    {...field.input}
  />
);

const OnboardingServer = ({ handleSubmit, submitting, valid }) => (
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
      <Field name="host" component={ServerTextField} />
    </View>

    <Spacer />

    <Button
      text="Connexion"
      disabled={!valid || submitting}
      onPress={handleSubmit}
      style={{ container: OnboardingHome.styles.Button }}
    />
  </View>
);

OnboardingServer.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
};

const ConnectedOnboardingServer = reduxForm({
  form: house.actions.connectToServer.formName,
  validate: values => (values.host ? {} : { host: 'requis' }),
  onSubmit: (args, dispatch) => dispatch(house.actions.connectToServer.submit(args)),
})(OnboardingServer);

ConnectedOnboardingServer.renderNavigationBar = () => <View />;

export default ConnectedOnboardingServer;
