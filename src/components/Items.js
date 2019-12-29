import React from 'react';

import Item from './Item';

const Items = (props) => {
  props.data.map((item, index) => {
    return (
      <Item
        id={index}
        header={item.name}
        subheader="Statistics"
        stats={item.stats}
      />
    );
  });
}

export default Items;