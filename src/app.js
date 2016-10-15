import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
import configureStore from './store/configureStore';
import base from './base';
import onboarding from './onboarding';

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
    return (
      <Provider store={store}>
        <Router>
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
          </Scene>
        </Router>
      </Provider>
    );
  }
}

export default App;
