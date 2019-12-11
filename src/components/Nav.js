import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <nav className="nav nav-pills flex-column flex-sm-row">
        <Link className="flex-sm-fill text-sm-center nav-link" href="#">People</Link>
        <Link className="flex-sm-fill text-sm-center nav-link" href="#">Planets</Link>
        <Link className="flex-sm-fill text-sm-center nav-link" href="#">Films</Link>
        <Link className="flex-sm-fill text-sm-center nav-link" href="#">Species</Link>
        <Link className="flex-sm-fill text-sm-center nav-link" href="#">Vehicles</Link>
        <Link className="flex-sm-fill text-sm-center nav-link" href="#">Starships</Link>
      </nav>

      <div>
        <Switch>
          {/* <Route exact path='/people' component={People} /> */}
          {/* <Route exact path='/planets' component={Planets} /> */}
          {/* <Route exact path='/films' component={Films} /> */}
          {/* <Route exact path='/species' component={Species} /> */}
          {/* <Route exact path='/vehicles' component={Vehicles} /> */}
          {/* <Route exact path='/starships' component={Starships} /> */}
          </Switch>
      </div>
    </div>
  );
}

export default Nav