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

  searchTracks(){
    const { artist, track } = this.state
    fetch(`/api/v1/${artist}/search-tracks`)
      .then(response => response.json())
      .then(songs => console.log(songs))
      .catch(error => console.log(error))
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
          <input type="text" placeholder="artist" onChange={(e) => this.setState({ artist: e.target.value })} value={this.state.artist}/>
          <input type="text" placeholder="song" onChange={(e) => this.setState({ track: e.target.value })} value={this.state.track}/>
          <button onClick={() => this.searchTracks()}>submit</button>
        </div>
        

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
