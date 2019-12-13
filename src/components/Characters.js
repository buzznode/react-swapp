import React, { Component } from 'react';

class Characters extends Component {
  render() {
    return (
      <div className="content">
        <div className="instructions">
          Use the interace below to do some stuff with characters.
        </div>
        <form>
          <div className="search-line">
            Search Criteria
            <input type='text' onChange={this.myChangeHandler} />
            <button onClick={this.clickHandler}>Search</button>  
          </div>
        </form>
      </div>
    );
  }
}

export default Characters