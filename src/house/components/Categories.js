import React, { PropTypes, Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Actions } from 'react-native-router-flux';
import base from './../../base';
import * as selectors from './../selectors';
import * as actions from './../actions';

const { InnerView, List, ListItem, Navbar, colors } = base;

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
    const { categories, dispatch } = this.props;

    return (
      <InnerView>
        <List
          dataSource={categories}
          renderRow={o => <ListItem text={o} onPress={() => dispatch(actions.goToAdapters(o))} />}
        />
      </InnerView>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
};

Categories.styles = StyleSheet.create({
  Navbar: {
    backgroundColor: colors.primaryColor,
  },
});

Categories.renderNavigationBar = () => (
  <Navbar
    title="Catégories"
    style={Categories.styles.Navbar}
    navIconName="arrow-back"
    onIconClicked={Actions.pop}
  />
);

export default connect(createStructuredSelector({
  categories: selectors.getCategories,
}))(Categories);
