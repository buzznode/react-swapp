import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import SWAPI from '../api/SWAPI';

function Vehicles() {
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
      async function fetchVehiclesList() {
        try {
          setLoading(true);
          const response = await SWAPI.get('/vehicles', {
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
        fetchVehiclesList();
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
                  <option>Cargo Capacity</option>
                  <option>Consumables</option>
                  <option>Cost In Credits</option>
                  <option>Crew</option>
                  <option>Length</option>
                  <option>Manufacturer</option>
                  <option>Max Atmosphering Speed</option>
                  <option>Model</option>
                  <option>Name</option>
                  <option>Passengers</option>
                  <option>Pilots</option>
                  <option>Vehicle Class</option>
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
            <h1>Search for Vehicles</h1>
          ) : loading === null ? (
            <h1>No Vehicles Found</h1>
          ) : (
            result.map((item, index) => {
              return (
                <Card border="warning" className="vehicle-card item" key={index}>
                  <Card.Header>{item.name}</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <span><b><u>Statistics</u></b></span><br />
                      <span><b>Model:</b>&nbsp;&nbsp;{item.model}</span><br/>
                      <span><b>Manufacturer:</b>&nbsp;&nbsp;{item.manufacturer}</span><br/>
                      <span><b>Vehicle Class:</b>&nbsp;&nbsp;{item.vehicle_class}</span><br/>
                      <span><b>Length:</b>&nbsp;&nbsp;{item.length}</span><br/>
                      <span><b>Max Speed:</b>&nbsp;&nbsp;{item.max_atmosphering_speed}</span><br/>
                      <span><b>Pilots:</b>&nbsp;&nbsp;{item.pilots}</span><br/>
                      <span><b>Crew:</b>&nbsp;&nbsp;{item.crew}</span><br/>
                      <span><b>Passengers:</b>&nbsp;&nbsp;{item.passengers}</span><br/>
                      <span><b>Cargo Capacity:</b>&nbsp;&nbsp;{item.cargo_capacity}</span><br/>
                      <span><b>Consumables:</b>&nbsp;&nbsp;{item.consumables}</span><br/>
                      <span><b>Cost (in credits):</b>&nbsp;&nbsp;{item.cost_in_credits}</span><br/>
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

export default Vehicles