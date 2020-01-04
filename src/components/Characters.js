import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import SWAPI from '../api/SWAPI';

function Characters() {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [validated, setValidated] = useState(false);
  const [result, loading] = useAsyncHook(query);

  const params = new URLSearchParams();

  function handleSubmit(e) {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (form[0].validity.valid) {
      e.preventDefault();

      // set query to whatever search is. This will in turn be passed
      // into useAsyncHook as "query" which will be consumed internally
      // as params.
      setQuery(search);      
    }

    setValidated(true);
  }

  function updateParams() {
    const ss = document.getElementById('searchString');
    const lq = document.getElementById('limitQuantity');
    let v = '';

    v = ss.value && ss.value.toLowerCase() === 'all' ? '' : ss.value ? ss.value : '';
    params.delete('q');
    params.append('q', v);

    v = lq.value ? lq.value : 0;
    params.delete('_limit');
    
    if (v > 0) {
      params.append('_limit', v);
    }

    setSearch(params);
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

          setResult(response.data);
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
                id="searchString"
                type="text"
                size="sm"
                style={{ width: "300px" }}
                placeholder="Search string"
                onChange={updateParams}
              />
              <Form.Control.Feedback tpe="invalid">Type something, loser</Form.Control.Feedback>
              <div className="vspacer1" />
              <Button type="submit" variant="outline-warning">Apply</Button>
              <Button type="reset" variant="outine-warning">Reset</Button>
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group>
              <Form.Label>Limit Results</Form.Label>
              <Form.Control
                id="limitQuantity"
                type="text"
                size="sm"
                style={{ width: "100px" }}
                placeholder="Limit results"
                onChange={updateParams}
              />
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
            result.map((item, index) => {
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
              );              
            })
          )
        }
      </div>
    </div>
  );
}

export default Characters