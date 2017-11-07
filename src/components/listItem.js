import React from 'react';

import curry from 'lodash/fp/curry';
import map from 'lodash/fp/map';

import Styles from './styles';

import Loader from './loader';

const renderListItem = curry((entities, Component, id) => {
  return (
    <li
      className={'item-list'}
      key={id}
    >
      <Component {...entities[id]} />
    </li>
  );
});

const ItemList = (props: Props) => {
  const {
    entities,
    ids,
    isPending,
    component: Component,
  } = props;

  if (isPending) {
    return <Loader display={true}/>
  }

  if (ids.length === 0) {
    return <p>No items to display</p>;
  }

  return (
    <ul>
      {map(renderListItem(entities, Component), ids)}
    </ul>
  );
}

export default ItemList;
