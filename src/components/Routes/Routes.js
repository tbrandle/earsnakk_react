import React from 'react';
import { Route } from 'react-router';

import Login from '../Login/Login';
// import Home from '../Home/Home';
import HomeContainer from '../../containers/HomeContainer';
import CreateChannel from '../CreateChannel/CreateChannel';

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={ Login } />
      <Route exact path="/home" component={ HomeContainer } />
      <Route exact path="/create-channel" component={ CreateChannel } />
    </div>
  )
}

export default Routes;
