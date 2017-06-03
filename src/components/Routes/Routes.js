import React from 'react';
import { Route } from 'react-router';

import Login from '../Login/Login';

import HomeContainer from '../Home/HomeContainer';
import CreateChannelContainer from '../CreateContainer/CreateChannelContainer';

import FindChannel from '../FindChannel/FindChannel';
import ChannelContainer from '../Channel/ChannelContainer';

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={ Login } />
      <Route exact path="/home" component={ HomeContainer } />
      <Route exact path="/create-channel" component={ CreateChannelContainer } />
      <Route exact path="/find-channel" component={ FindChannel } />
      <Route exact path="/channel" component={ ChannelContainer } />
    </div>
  )
}

export default Routes;
