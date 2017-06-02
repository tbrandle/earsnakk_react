import React from 'react';
import { Route } from 'react-router';

import Login from './Login';
import Home from './Home';

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={ Login } />
      <Route exact path="/home" component={ Home } />
    </div>
  )
}

export default Routes;