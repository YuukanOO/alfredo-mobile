import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Actions } from 'react-native-router-flux';
import base from './../../base';
import Categories from './Categories';
import * as selectors from './../selectors';
import * as actions from './../actions';

const { InnerView, Navbar, List, ListItem } = base;

const Adapters = ({ currentAdapters, dispatch }) => (
  <InnerView>
    <List
      dataSource={currentAdapters}
      renderRow={o => (
        <ListItem
          text={o.name}
          detail={o.description}
          onPress={() => dispatch(actions.addDevice(o.id))}
        />
      )}
    />
  </InnerView>
);

Adapters.propTypes = {
  currentAdapters: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
};

Adapters.styles = Categories.styles;

const ConnectedNavbar = connect(createStructuredSelector({
  currentCategory: selectors.getCurrentCategory,
}))(({ currentCategory }) => (
  <Navbar
    title={currentCategory}
    style={Adapters.styles.Navbar}
    navIconName="arrow-back"
    onIconClicked={Actions.pop}
  />
));

Adapters.renderNavigationBar = () => <ConnectedNavbar />;

export default connect(createStructuredSelector({
  currentAdapters: selectors.getCurrentAdapters,
}))(Adapters);
