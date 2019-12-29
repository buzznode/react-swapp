import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import SWAPI from '../api/SWAPI';
import Items from './Items';

function Characters() {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [validated, setValidated] = useState(false);
  const [result, loading] = useAsyncHook(query);

  function handleSearchChange(e) {
    if (e.target.value) {
      const params = new URLSearchParams();
      const value = e.target.value.toLowerCase() === 'all' ? '' : e.target.value;
      params.append("q", value);
      setSearch(params);
    }
    else {
      setSearch('');
    }
  }

  function handleSubmit(e) {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    setQuery(search);

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (form[0].validity.valid) {
      e.preventDefault();
      setQuery(search);      
    }

    setValidated(true);
  }

  function useAsyncHook(params) {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      async function fetchCharacterList() {
        try {
          setLoading(true);
          const response = await SWAPI.get('/people', {
            params
          });

          const data = [];
          for (let i = 0; i < response.data.length; i++) {
            data[i] = {};
            const item = response.data[i];
            data[i].header = item.name;
            data[i].subheader = "Statistics";
            data[i].stats = [];
            data[i].stats.push({ key: "Height", value: item.height });
            data[i].stats.push({ key: "Mass", value: item.mass });
            data[i].stats.push({ key: "Birth Year", value: item.birth_year });
            data[i].stats.push({ key: "Hair Color", value: item.hair_color });
            data[i].stats.push({ key: "Skin Color", value: item.skin_color });
            data[i].stats.push({ key: "Eye Color", value: item.eye_color });
          };

          setResult([data]);
        }
        catch (e) {
          setLoading(null);
          console.log(`Axios request failed: ${e}`);
        }
      }

      if (params !== '') {
        fetchCharacterList();
      }
    }, [params]);

    return [result, loading];
  }

  return (
    <div className="content">
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Col sm={3}>
            <Form.Group>
              <Form.Label>Full Text Search</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                style={{ width: "300px" }}
                placeholder="Search string"
                onChange={handleSearchChange}
              />
              <Form.Control.Feedback tpe="invalid">Type something, loser</Form.Control.Feedback>
              <div className="vspacer1" />
              <Button type="submit" variant="outline-warning">Apply</Button>
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group>
              <Form.Label>Additional Options</Form.Label>
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>

      <div className="cards-container">
        {
          loading === false ? (
            <h1>Search for Characters</h1>
          ) : loading === null ? (
            <h1>No Characters Found</h1>
          ) : (
            // result.map((item, index) => {
              // return (
                <Items data={result} />
                // <Card border="warning" className="item" key={index}>
                //   <Card.Header>{item.name}</Card.Header>
                //   <Card.Body>
                //     <Card.Text>
                //       <span><b><u>Statistics</u></b></span><br />
                //       <span><b>Height:</b>&nbsp;&nbsp;{item.height}</span><br/>
                //       <span><b>Mass:</b>&nbsp;&nbsp;{item.mass}</span><br/>
                //       <span><b>Birth Year:</b>&nbsp;&nbsp;{item.birth_year}</span><br/>
                //       <span><b>Hair Color:</b>&nbsp;&nbsp;{item.hair_color}</span><br/>
                //       <span><b>Skin Color:</b>&nbsp;&nbsp;{item.skin_color}</span><br/>
                //       <span><b>Eye Color:</b>&nbsp;&nbsp;{item.eye_color}</span><br/>
                //     </Card.Text>
                //   </Card.Body>
                // </Card>
              // );              
            // })
          )
        }
      </div>
    </div>
  );
}

export default Characters