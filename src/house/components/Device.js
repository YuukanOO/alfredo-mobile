import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Actions } from 'react-native-router-flux';
import { MKTextField } from 'react-native-material-kit';
import { StyleSheet, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import Categories from './Categories';
import base from './../../base';
import * as constants from './../constants';
import * as actions from './../actions';
import * as selectors from './../selectors';

const { InnerView, Navbar, colors } = base;

const TextField = field => (
  <MKTextField
    floatingLabelEnabled
    underlineColorAndroid="transparent"
    style={Device.styles.TextInput}
    highlightColor={colors.primaryColor}
    editable={!field.meta.submitting}
    placeholder={field.placeholder}
    underlineSize={field.meta.active ? 2 : 1}
    placeholderColor={colors.disabledTextOnLightColor}
    {...field.input}
  />
);

const Device = ({ adapter: { config }, submitting }) => (
  <InnerView loading={submitting}>
    <View style={Device.styles.Container}>
      <Field name="name" component={TextField} placeholder="Nom" />
      {Object.keys(config).map(o => (
        <Field key={o} name={`config.${o}`} component={TextField} placeholder={o} />
      ))}
    </View>
  </InnerView>
);

Device.propTypes = {
  adapter: PropTypes.shape({
    config: PropTypes.object,
  }),
  submitting: PropTypes.bool,
};

Device.styles = StyleSheet.create({
  Container: {
    margin: 16,
  },
  TextInput: {
    height: 48,
    marginBottom: 8,
  },
});

const form = reduxForm({
  form: actions.registerDevice.formName,
  onSubmit: (args, dispatch) => dispatch(actions.registerDevice.submit(args)),
});

const ConnectedDevice = connect(createStructuredSelector({
  adapter: selectors.getCurrentAdapter,
}))(form(Device));

const DeviceNavbar = connect(createStructuredSelector({
  device: selectors.getCurrentDevice,
}))(form(({ device: { id, name }, handleSubmit }) => (
  <Navbar
    title={!id ? 'Nouvel accessoire' : name}
    style={Categories.styles.Navbar}
    navIconName="arrow-back"
    onIconClicked={Actions.pop}
    actions={[{
      title: 'Ajouter',
      iconName: 'done',
      show: 'always',
      onPress: handleSubmit,
    }]}
  />
)));

ConnectedDevice.renderNavigationBar = () => <DeviceNavbar />;

export default ConnectedDevice;
