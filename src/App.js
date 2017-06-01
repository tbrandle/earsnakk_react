import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount() {
  //  fetch('/auth/spotify')
  //    .then(res => console.log(res.json()))
  //   //  .then(info => console.log(info))
  //    .catch(error => console.log(error))
 }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Poo</h2>
          <a href="http://localhost:8888/auth/spotify"> login</a>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
