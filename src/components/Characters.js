import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import SWAPI from '../api/SWAPI';

function Characters() {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [validated, setValidated] = useState(false);
  const [result, loading] = useAsyncHook(query);

  function handleGetAll(e) {
    e.preventDefault();
  }

  function handleSubmit(e) {
    const form = e.currentTarget;

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

  function useAsyncHook(criteria) {
    console.log(`criteria: ${criteria}`);
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      async function fetchCharacterList() {
        try {
          setLoading(true);
          const response = await SWAPI.get('/people', {
            params: {
              criteria
            }
          });

          setResult(response.data);
        }
        catch (e) {
          setLoading(null);
          console.log(`Axios request failed: ${e}`);
        }
      }

      if (criteria !== '') {
        fetchCharacterList();
      }
    }, [criteria]);

    return [result, loading];
  }

  return (
    <div className="content">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustom0">
            <Form.Label>Search Criteria</Form.Label>
            <Form.Control 
              required 
              type="text" 
              style={{width: '300px'}} 
              placeholder="Search string"
              // onChange={e => setSearch(e.target.value)} 
              onChange={e => setSearch(`q: ${e.target.value}`)}
            />
            <Form.Control.Feedback type="invalid">
              Type something, loser
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Other Getters</Form.Label>
            <Button onClick={handleGetAll}>Get All Characters</Button>
          </Form.Group>
        </Form.Row>
        <Button type="submit" variant="outline-warning">Search</Button>
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