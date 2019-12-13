import React, { Component } from 'react';

class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ''
    }
  }

  changeHandler = (e) => {
    this.setState({
      searchString: e.target.value
    });
  }

  clickHandler = (e) => {
    e.preventDefault();
    alert(`got click with ${this.state.searchString}`);
  }

  render() {
    return (
      <div className="content">
        <div className="instructions">
          Use the interace below to do some stuff with characters.
        </div>
        <form>
          <div className="search-line">
            <div className="pad-right-1">
              Search Criteria
            </div>
            <div className="pad-right-1">
              <input type='text' style={{width: '300px'}} onChange={this.changeHandler} />
            </div>
            <div>
              <button onClick={this.clickHandler}>Search</button>  
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Characters