import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Routes from '../Routes/Routes';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // this user object has the display name that we will need to create playlists.
      user: {}
    }
  }

  render() {
    return (
      <div>
        <Link to="/home">
          <header className="header">
            <h1 className="logo">earsnakk</h1>
          </header>
        </Link>
        <Routes />
      </div>

    );
  }
}

export default App;
