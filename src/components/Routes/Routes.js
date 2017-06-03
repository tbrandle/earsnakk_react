import React from 'react';
import { Route } from 'react-router';

import Login from '../Login/Login';
import HomeContainer from '../Home/HomeContainer';
import CreateChannel from '../CreateChannel/CreateChannel';
import FindChannel from '../FindChannel/FindChannel';
import Channel from '../Channel/Channel';

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={ Login } />
      <Route exact path="/home" component={ HomeContainer } />
      <Route exact path="/create-channel" component={ CreateChannel } />
      <Route exact path="/find-channel" component={ FindChannel } />
      <Route exact path="/franklin-channel" component={ Channel } />
    </div>
  )
}

export default Routes;
