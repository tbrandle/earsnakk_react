import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Redirect } from 'react-router-dom';


class App extends Component {
  
  fetchLogin(){
    return <Redirect to='/login' />
  }
  render() {
    return (
      <div className="App">
        <h1>earsnakk</h1>
        <button onClick={() => this.fetchLogin()}>Login</button>
      </div>
    );
  }
}

export default App;


res.redirect('https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  }));