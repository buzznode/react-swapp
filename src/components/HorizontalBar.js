import React from 'react';
import '../styles/Swapp.scss';

const HorizontalBar = (props) => {
  return (
    <hr 
      style={{
        color: props.color ? props.color : 'var(--yellow)',
        backgroundColor: props.bgColor ? props.bgColor : 'var(--yellow)',
        height: props.height ? props.height : 2,
        width: props.width ? props.width : '100%'
      }}
    />
  );
}

export default HorizontalBar