import React, { Component } from 'react';
import './Channel.css';

class Channel extends Component {
  constructor() {
    super()
    this.state = {
      artist: '',
      track: '',
      searchTracks: [],
      display: 'hidden'
    }
  }
  
  componentDidMount() {
    var socket = require('socket.io-client')();
    socket.on('connect', function(){
      console.log('is this fucking hooked up yet?');
    });
    // socket.on('event', function(data){});
    // socket.on('disconnect', function(){});
  }

  displayTracks(){
    return this.props.searchSongs.map((track, i) => {
      console.log(track);
      return (<div>
        <p key={i} onClick={ (e) => this.addSong(track.uri) } data-key={track.uri} className="track">track name: {track.name}</p>
      </div>)
    })
  }

  searchTracks() {
    const { artist, track } = this.state
    this.props.fetchSongs({ artist, track })
    this.toggleSearch()
  }

  toggleSearch(){
    this.setState({ display: '' })
  }

  addSong(uri) {

    fetch(`/api/v1/channel/${this.props.playlist.id}/songs`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ uri, userID: this.props.user.id }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }

  render(){
    const { uri } = this.props.playlist;

    return (
      <div>
        <div className="playlist-wrapper">
          <iframe src={`https://open.spotify.com/embed?uri=${uri}&theme=white`}
                  height="80"
                  frameBorder="0"
                  allowTransparency="true">
          </iframe>
        </div>

        <div className="search-wrapper">
          <input type="text" placeholder="artist" onChange={(e) => this.setState({ artist: e.target.value })} value={this.state.artist}/>
          <input type="text" placeholder="song" onChange={(e) => this.setState({ track: e.target.value })} value={this.state.track}/>
          <button onClick={() => this.searchTracks()}>submit</button>
          <div className={this.state.display || 'track-wrapper'}>
            { this.props.searchSongs.length && this.displayTracks() }
          </div>
        </div>
      </div>
    )

  }
}

export default Channel;
