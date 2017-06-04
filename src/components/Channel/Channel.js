import React, { Component } from 'react';
import './Channel.css'


class Channel extends Component {
  constructor() {
    super()
    this.state = {
      artist: '',
      track: ''
    }
  }

  render(){
    return (
      <div>
        <input type="text" />
        <button onClick={() => this.searchTracks()}>submit</button>
        <h1>PLAYER WIDGET</h1>
        <ul>
          <li>Tim</li>
          <li>Julian</li>
          <li>Franklin</li>
        </ul>
      </div>
    )

  }
}

export default Channel;
