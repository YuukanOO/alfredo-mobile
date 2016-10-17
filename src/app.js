import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
import configureStore from './store/configureStore';
import base from './base';
import onboarding from './onboarding';
import house from './house';

const store = configureStore();

// Additional scene props for each scene component.
const sceneProps = {
  panHandlers: null,
};

class App extends Component {
  componentDidMount() {
    store.dispatch(base.actions.applicationStarted());
  }

  render() {
    const RouterWithRedux = connect()(Router);

    return (
      <RouterWithRedux>
        <Scene key="root">
          <Scene
            key={onboarding.constants.LOADING_SCENE_KEY}
            component={onboarding.Loading}
            initial
            {...sceneProps}
          />
          <Scene
            key={onboarding.constants.ONBOARDING_HOME_SCENE_KEY}
            component={onboarding.OnboardingHome}
            {...sceneProps}
          />
          <Scene
            key={onboarding.constants.ONBOARDING_SERVER_SCENE_KEY}
            component={onboarding.OnboardingServer}
            {...sceneProps}
          />
          <Scene
            key={house.constants.ROOMS_SCENE_KEY}
            component={house.Rooms}
            {...sceneProps}
          />
        </Scene>
      </RouterWithRedux>
    );
  }
}

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
