import React, { PropTypes, Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import base from './../../base';

const { InnerView, Navbar, colors } = base;

class Categories extends Component {
  componentWillMount() {
    this.props.dispatch(base.actions.setStatusbar({
      backgroundColor: base.colors.primaryColorDark,
    }));
  }

  componentWillUnmount() {
    this.props.dispatch(base.actions.setStatusbar({
      backgroundColor: 'transparent',
    }));
  }

  render() {
    return (
      <InnerView>
        
      </InnerView>
    );
  }
}

Categories.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

Categories.styles = StyleSheet.create({
  Navbar: {
    backgroundColor: colors.primaryColor,
  },
});

Categories.renderNavigationBar = () => (
  <Navbar
    title="Ajouter un accessoire"
    style={Categories.styles.Navbar}
    navIconName="arrow-back"
    onIconClicked={Actions.pop}
  />
);

export default connect()(Categories);
