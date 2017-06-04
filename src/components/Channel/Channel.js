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
        {/* GRAB playlist endpoint and throw in this url */}
        <div className="playlist-wrapper">
          <iframe src="https://open.spotify.com/embed?uri=spotify%3Auser%3Aspotify%3Aplaylist%3A2PXdUld4Ueio2pHcB6sM8j&theme=white" 
                  height="80" 
                  frameborder="0" 
                  allowtransparency="true"></iframe>
        </div>
        
        <div className="search-wrapper">
          <input type="text" />
          <button onClick={() => this.searchTracks()}>submit</button>
        </div>
        
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
