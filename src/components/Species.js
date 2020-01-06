import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import SWAPI from '../api/SWAPI';

function Species() {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [result, loading] = useAsyncHook(query);

  const params = new URLSearchParams();

  function handleReset(e) {
    document.getElementById('txtSearch').value = '';
    document.getElementById('txtLimit').value = '';
    document.getElementById('ddlSortBy').value = '';
    document.getElementById('ddlOrder').value = '';
  }

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
  }

  function updateParams() {
    const ss = document.getElementById('txtSearch');
    const lq = document.getElementById('txtLimit');
    const sb = document.getElementById('ddlSortBy');
    const or = document.getElementById('ddlOrder');
    let v = '';

    // if the search string is 'all', convert to empty string otherwise use value
    v = ss.value && ss.value.toLowerCase() === 'all' ? '' : ss.value ? ss.value : '';
    params.delete('q');
    params.append('q', v);

    // if limit quantity is provided use it
    v = lq.value ? lq.value : 0;
    params.delete('_limit');
    
    if (v > 0) {
      params.append('_limit', v);
    }

    // if sort by provided and not default, use it
    v = sb.value && sb.value !== 'Select...' ? sb.value : '';
    params.delete('_sort');
    
    if (v) {
      v = v.toLowerCase();
      v = v.replace(' ', '_');
      params.append('_sort', v);

      // if sort by provided and order is provided and not 
      // 'Select...', use it otherwise default to 'asc'
      v = or.value && or.value !== 'Select...' ? or.value : 'asc';
      v = v === 'Descending' ? 'desc' : 'asc';
      params.delete('_order');
      params.append('_order', v);
    }

    /*
    _sort=column&_order=asc
    _sort=colA,colB&_order=desc,asc
    _start=20&end=30  start is inclusive; end is exclusive
    */
   console.log(`params: ${params}`);
    setSearch(params);
  }

  function useAsyncHook(params) {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      async function fetchSpeciesList() {
        try {
          setLoading(true);
          const response = await SWAPI.get('/species', {
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
        fetchSpeciesList();
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
                id="txtSearch"
                type="text"
                size="sm"
                style={{ width: "300px" }}
                placeholder="Search string"
                onChange={updateParams}
              />
              <Form.Control.Feedback tpe="invalid">Type something, loser</Form.Control.Feedback>
              <div className="vspacer1" />
              <Button type="submit" variant="outline-warning">Apply</Button>
              &nbsp;&nbsp;
              <Button type="button" onClick={handleReset} variant="outline-warning">Reset</Button>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group>
              <Form.Label>Limit Results</Form.Label>
              <Form.Control
                id="txtLimit"
                type="text"
                size="sm"
                style={{ width: "100px" }}
                placeholder="Limit results"
                onChange={updateParams}
              />
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Row>
              <Form.Group>
                <Form.Label>Sort By</Form.Label>
                <Form.Control 
                  as="select"
                  id="ddlSortBy"
                  size="sm"
                  style={{ width: "150px" }}
                  onChange={updateParams}
                >
                  <option></option>
                  <option>Average Height</option>
                  <option>Average Lifespan</option>
                  <option>Classification</option>
                  <option>Designation</option>
                  <option>Eye Colors</option>
                  <option>Hair Colors</option>
                  <option>Language</option>
                  <option>Name</option>
                  <option>Skin Colors</option>
                </Form.Control>
              </Form.Group>
              &nbsp;&nbsp;
              <Form.Group>
                <Form.Label>Order</Form.Label>
                <Form.Control 
                  as="select"
                  id="ddlOrder"
                  size="sm"
                  style={{ width: "150px" }}
                  onChange={updateParams}
                >
                  <option></option>
                  <option>Ascending</option>
                  <option>Descending</option>
                </Form.Control>
              </Form.Group>
            </Row>
          </Col>
        </Form.Row>
      </Form>

      <div className="cards-container">
        {
          loading === false ? (
            <h1>Search for Species</h1>
          ) : loading === null ? (
            <h1>No Species Found</h1>
          ) : (
            result.map((item, index) => {
              return (
                <Card border="warning" className="species-card item" key={index}>
                  <Card.Header>{item.name}</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <span><b><u>Statistics</u></b></span><br />
                      <span><b>Classification:</b>&nbsp;&nbsp;{item.classification}</span><br/>
                      <span><b>Designation:</b>&nbsp;&nbsp;{item.designation}</span><br/>
                      <span><b>Language:</b>&nbsp;&nbsp;{item.language}</span><br/>
                      <span><b>Average Lifespan:</b>&nbsp;&nbsp;{item.average_lifespan}</span><br/>
                      <span><b>Average Height:</b>&nbsp;&nbsp;{item.average_height}</span><br/>
                      <span><b>Skin Colors:</b>&nbsp;&nbsp;{item.skin_colors}</span><br/>
                      <span><b>Hair Colors:</b>&nbsp;&nbsp;{item.hair_colors}</span><br/>
                      <span><b>Eye Colors:</b>&nbsp;&nbsp;{item.eye_colors}</span><br/>
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

export default Species