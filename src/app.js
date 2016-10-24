import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
import { View } from 'react-native';
import configureStore from './store/configureStore';
import base from './base';
import onboarding from './onboarding';
import house from './house';

const { Statusbar } = base;
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
      <View style={{ flex: 1 }}>
        <Statusbar />
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
            <Scene
              key={house.constants.CATEGORIES_SCENE_KEY}
              component={house.Categories}
              {...sceneProps}
            />
            <Scene
              key={house.constants.ADAPTERS_SCENE_KEY}
              component={house.Adapters}
              {...sceneProps}
            />
          </Scene>
        </RouterWithRedux>
      </View>
    );
  }
}

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
