import React, { Component } from 'react';
import './Channel.css';
import TrackList from './TrackList'
import DisplaySearchTracks from './DisplaySearchTracks'
const io = require('socket.io-client')
const socket = io()


class Channel extends Component {
  constructor() {
    super()
    this.state = {
      artist: '',
      track: '',
      searchTracks: [],
      display: 'hidden',
      // socket: require('socket.io-client')()
    }

  }

  componentWillReceiveProps(nextProps) {
    socket.emit('channel', {
      channel: nextProps.playlist.id
    });
  }

  componentDidMount() {
    console.log(this.props.playlist);
    const { user } = this.props
    const { playlist:{ owner, id }, playlist, getTracks } = this.props


    socket.on('connect', function(){
      console.log('Socket connect');
    });

    socket.emit('channel', {
      channel: this.props.playlist.id
    })
    socket.on('song uri', function (uri) {
      // check if this.props.userId matches this.props.playlist.owner.id

      if (user.id === owner.id) {
        console.log("inside check")

        fetch(`/api/v1/channel/${id}/songs`, {

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
    getTracks({ ownerID: owner.id, playlistID: id })
  }


  componentWillUnmount(){
    const { user, playlist:{owner}, playlist } = this.props
    socket.disconnect()
    if (user.id === owner.id) {
      const newChannelsArray = this.props.channels.filter(activeChannel => activeChannel.id !== playlist.id)
      this.props.removePlaylistFromChannels(newChannelsArray)
    }
    this.props.removePlaylistFromStore()
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

  render(){
    const { uri } = this.props.playlist;
    const { trackList } = this.props
    return (
      <div>
        <div className="playlist-wrapper">
          <iframe src={`https://open.spotify.com/embed?uri=${uri}&theme=white`}
                  height="80"
                  frameBorder="0"
                  allowTransparency="true">
          </iframe>
        </div>

        <TrackList tracks={trackList}/>

        <div className="search-wrapper">
          <input type="text" placeholder="artist" onChange={(e) => this.setState({ artist: e.target.value })} value={this.state.artist}/>
          <input type="text" placeholder="song" onChange={(e) => this.setState({ track: e.target.value })} value={this.state.track}/>
          <button onClick={() => this.searchTracks()}>submit</button>
        </div>

        <DisplaySearchTracks tracks={this.props.searchSongs} addSong={ (uri) => this.addSong(uri) }/>

      </div>
    )
  }
}

export default Channel;
