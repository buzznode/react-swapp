import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

const Item = (props) => {
    props.results.map((item, index) => {
      return (
        <Card border="warning" className="item" key={index}>
          <Card.Header>{item.name}</Card.Header>
          <Card.Body>
            <Card.Text>
              <span><b><u>Statistics</u></b></span><br />
              <span><b>Height:</b>&nbsp;&nbsp;{item.height}</span><br/>
              <span><b>Mass:</b>&nbsp;&nbsp;{item.mass}</span><br/>
              <span><b>Birth Year:</b>&nbsp;&nbsp;{item.birth_year}</span><br/>
              <span><b>Hair Color:</b>&nbsp;&nbsp;{item.hair_color}</span><br/>
              <span><b>Skin Color:</b>&nbsp;&nbsp;{item.skin_color}</span><br/>
              <span><b>Eye Color:</b>&nbsp;&nbsp;{item.eye_color}</span><br/>
            </Card.Text>
          </Card.Body>
        </Card>
      )
    });
}

export default Item
