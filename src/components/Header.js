import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../styles/Swapp.scss';

import HorizontalBar from './HorizontalBar';

const Header = (props) => {
  const { location } = props;

  return (
    <>
      <div className="header">SWAPP</div>
      <div className="subheader">A Star Wars Site</div>
      <HorizontalBar />
      <Navbar>
        <Nav activeKey={location.pathname}>
          <Nav.Link href='/people'>People</Nav.Link>
          <Nav.Link href='/planets'>Planets</Nav.Link>
          <Nav.Link href='/films'>Films</Nav.Link>
          <Nav.Link href='/species'>Species</Nav.Link>
          <Nav.Link href='/vehicles'>Vehicles</Nav.Link>
          <Nav.Link href='/starships'>Starships</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default Header