import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/App.scss';

import Header from './Header';
import People from './People';
import Planets from './Planets';
import Films from './Films';
import Species from './Species';
import Vehicles from './Vehicles';
import Starships from './Starships';
// import Swapp from './Swapp';

const HeaderWithRouter = withRouter(Header);

function App() {
  return (
    <Router>
      <Fragment>
        <HeaderWithRouter />
        <Route exact path='/people' component={People} />
        <Route exact path='/planets' component={Planets} />
        <Route exact path='/films' component={Films} />
        <Route exact path='/species' component={Species} />
        <Route exact path='/vehicles' component={Vehicles} />
        <Route exact path='/starships' component={Starships} />
      </Fragment>
    </Router>
    // <Swapp />
  );
}

export default App;
