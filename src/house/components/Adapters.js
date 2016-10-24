import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Actions } from 'react-native-router-flux';
import base from './../../base';
import Categories from './Categories';
import * as selectors from './../selectors';

const { InnerView, Navbar, List, ListItem } = base;

const Adapters = ({ currentAdapters }) => (
  <InnerView>
    <List
      dataSource={currentAdapters}
      renderRow={o => <ListItem text={o.name} detail={o.description} />}
    />
  </InnerView>
);

Adapters.propTypes = {
  currentAdapters: PropTypes.array,
};

Adapters.styles = Categories.styles;

Adapters.renderNavigationBar = () => (
  <Navbar
    title="Adaptateurs"
    style={Categories.styles.Navbar}
    navIconName="arrow-back"
    onIconClicked={Actions.pop}
  />
);

export default connect(createStructuredSelector({
  currentAdapters: selectors.getCurrentAdapters,
}))(Adapters);
