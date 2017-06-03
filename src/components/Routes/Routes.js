import React from 'react';
import { Route } from 'react-router';

import Login from '../Login/Login';
import Home from '../Home/Home';

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={ Login } />
      <Route exact path="/home" component={ Home } />
    </div>
  )
}

export default Routes;
