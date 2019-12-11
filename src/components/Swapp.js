import React, { Component } from 'react';
import '../styles/Swapp.scss';

import Header from './Header';
import HorizontalBar from './HorizontalBar';

class Swapp extends Component {
  render() {
    return (
      <>
        <Header />
        <HorizontalBar />
      </>
    )
  }
}

export default Swapp