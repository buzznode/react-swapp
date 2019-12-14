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
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      async function fetchCharacterList() {
        try {
          setLoading(true);
          const response = await SWAPI.get('/people', {
            params: {
              q: criteria
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
      <div className="instructions">
        Use the interace below to do some stuff with characters.
      </div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustom0">
            <Form.Label>Search Criteria</Form.Label>
            <Form.Control 
              required 
              type="text" 
              style={{width: '300px'}} 
              placeholder="Search string"
              onChange={e => setSearch(e.target.value)} 
            />
            <Form.Control.Feedback type="invalid">
              Type something, loser
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Button type="submit" variant="outline-warning">Search</Button>
      </Form>

      {
        loading === false ? (
          <h1>Search for Characters</h1>
        ) : loading === null ? (
          <h1>No Characters Found</h1>
        ) : (
          result.map(item => {
            return (
              <Card border="warning" style={{ width: '18rem' }}>
                <Card.Header>{item.name}</Card.Header>
                <Card.Body>
                  {/* <Card.Title>Warning Card Title</Card.Title> */}
                  <Card.Text>
                    <div>Height: {item.height}</div>
                    <div>Mass: {item.mass}</div>
                  </Card.Text>
                </Card.Body>
              </Card>
            );              
          })
        )
      }
    </div>
  );
}

export default Characters