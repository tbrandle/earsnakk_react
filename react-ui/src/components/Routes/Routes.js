import React from 'react';
import { Route } from 'react-router';

import Login from '../Login/Login';
import HomeContainer from '../Home/HomeContainer';
import CreateChannelContainer from '../CreateChannel/CreateChannelContainer';
import ChannelContainer from '../Channel/ChannelContainer';

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={ Login } />
      <Route exact path="/home" component={ HomeContainer } />
      <Route exact path="/create-channel" component={ CreateChannelContainer } />
      <Route exact path="/channel/:playlist_id" component={ ChannelContainer } />
    </div>
  )
}

export default Routes;
