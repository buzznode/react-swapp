import React from 'react';
import '../styles/Swapp.scss';

const HBar = (props) => {
  return (
    <hr 
      style={{
        color: props.color ? props.color : 'var(--yellow)',
        backgroundColor: props.bgColor ? props.bgColor : 'var(--yellow)',
        height: props.height ? props.height : 2,
        marginTop: props.marginTop ? props.marginTop : '0px',
        marginLeft: 'calc(5px + 2vmin)',
        marginRight: 'calc(5px + 2vmin)'
      }}
    />
  );
}

export default HBar