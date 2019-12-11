import React, { Component } from 'react';
import '../styles/Swapp.scss';

import Header from './Header';
import HorizontalBar from './HorizontalBar';
import Nav from './Nav';

class Swapp extends Component {
  render() {
    return (
      <>
        <Header />
        <HorizontalBar />
        <Nav />
      </>
    )
  }
}

export default Swapp