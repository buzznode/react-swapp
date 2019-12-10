import React, { Component } from 'react';

import SWAPI from '../api/SWAPI';

class PeopleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      people: []
    }
  }

  async componentDidMount() {
    try {
      let peopleData = await SWAPI.get('/people?_limit=10');

      this.setState({ people: peopleData.data });
    }
    catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  }

  render() {
    return (
      <ul>
        {this.state.people.map(person => <li>{person.name}</li>)}
      </ul>
    );
  }
}

export default PeopleList