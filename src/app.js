import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
import configureStore from './store/configureStore';
import base from './base';
import onboarding from './onboarding';

const store = configureStore();

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
            />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

export default App;
