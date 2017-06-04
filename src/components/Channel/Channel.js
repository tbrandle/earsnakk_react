import React, { Component } from 'react';
import './Channel.css'


class Channel extends Component {
  constructor() {
    super()
    this.state = {
      artist: '',
      track: '',
      searchTracks: []
    }
  }

  // <p>artist name: ${track.name}</p>
  displayTracks(){
    return this.state.searchTracks.map(track => {
      return (<div>
        <p>track name: {track.name}</p>
      </div>)
    })
  }

  searchTracks() {
    const { artist, track } = this.state
    fetch(`/api/v1/${artist}/search-tracks`)
      .then(response => response.json())
      .then(songs => this.setState({searchTracks: songs.tracks.items}))
      .catch(error => console.log(error))
  }

  testClick() {
    const { selectedSong } = this.state
    fetch(`/api/v1/playlist/songs`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }

  render(){
    // const { uri } = this.props.playlist;
    const uri = 'spotify:user:126858355:playlist:2maWm9kDvv9T9vJMmpTvI7';

    return (
      <div>
        <div className="playlist-wrapper">
          <iframe src={`https://open.spotify.com/embed?uri=${uri}&theme=white`}
                  height="80"
                  frameBorder="0"
                  allowTransparency="true"></iframe>
        </div>

        <div className="search-wrapper">
          <input type="text" placeholder="artist" onChange={(e) => this.setState({ artist: e.target.value })} value={this.state.artist}/>
          <input type="text" placeholder="song" onChange={(e) => this.setState({ track: e.target.value })} value={this.state.track}/>
          <button onClick={() => this.searchTracks()}>submit</button>
          { this.state.searchTracks.length && this.displayTracks() }
        </div>

        <button onClick={ () => this.testClick() }>TEST</button>
      </div>
    )

  }
}

export default Channel;
