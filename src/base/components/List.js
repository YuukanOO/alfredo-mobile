import React, { PropTypes } from 'react';
import { ListView, StyleSheet } from 'react-native';

const List = ({ dataSource, style, ...props }) => {
  const ds = List.createDataSource(dataSource,
      (r1, r2) => r1 !== r2,
      props.renderSectionHeader ? (s1, s2) => s1 !== s2 : null,
      props.sectionIdentities
  );

  return (
    <ListView
      style={[List.styles.Container, style]}
      dataSource={ds}
      onEndReachedThreshold={400}
      {...props}
    />
  );
};

/**
 * Crée une source de données depuis un tableau d'éléments.
 */
List.createDataSource = function createDataSource(array, rowHasChanged,
                                                  sectionHeaderHasChanged, sectionIdentities) {
  const ds = new ListView.DataSource({
    rowHasChanged,
    sectionHeaderHasChanged,
  });

  return (sectionIdentities ?
    ds.cloneWithRowsAndSections(array, sectionIdentities(array))
    : ds.cloneWithRows(array));
};

List.propTypes = {
  dataSource: PropTypes.any,
  isFetching: PropTypes.bool,
  renderEmpty: PropTypes.func,
  renderLoading: PropTypes.func,
  renderSectionHeader: PropTypes.func,
  sectionIdentities: PropTypes.func,
  style: PropTypes.any,
};

List.styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});

export default List;
