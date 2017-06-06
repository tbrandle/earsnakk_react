import React, { Component } from 'react';
import './Channel.css';
const io = require('socket.io-client')
const socket = io()
// import io from 'socket.io-client';


class Channel extends Component {
  constructor() {
    super()
    this.state = {
      artist: '',
      track: '',
      searchTracks: [],
      display: 'hidden'
      // socket: require('socket.io-client')()
    }

  }


  componentDidMount() {
    const { user } = this.props
    const { playlist:{owner}, playlist } = this.props

    socket.on('connect', function(){
      console.log('is this fucking hooked up yet?');
    });

    socket.on('song uri', function (uri) {
      // check if this.props.userId matches this.props.playlist.owner.id

      if (user.id === owner.id) {
        console.log("inside check")

        fetch(`/api/v1/channel/${playlist.id}/songs`, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ uri, userID: owner.id }),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        // this.addSong()
        console.log("song uri client: ", uri)

    }

  })
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
    socket.emit('song uri', uri)
  }



  // followPlaylist() {
  //   fetch(`/api/v1/user/12123400211/channel/${playlist_id}/followers`,{
  //     method: 'PUT',
  //     headers: { 'Content-type': 'application/json' },
  //   })
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  // }


  render(){
    const { uri } = this.props.playlist;
    const { playlist, getTracks } = this.props
    return (
      <div>
        <div className="playlist-wrapper">
          <iframe src={`https://open.spotify.com/embed?uri=${uri}&theme=white`}
                  height="80"
                  frameBorder="0"
                  allowTransparency="true">
          </iframe>
        </div>

        <div className="track-list">
          { playlist.id.length && getTracks({ ownerID: playlist.owner.id, playlistID: playlist.id }) }
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
