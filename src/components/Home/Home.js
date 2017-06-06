import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Home.css';
import Routes from '../Routes/Routes';
const io = require('socket.io-client')
const socket = io()

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      earsnakkPlaylists: [],
    }
  }

  componentWillMount(){
    this.props.profileFetch()
  }

  componentDidMount(page) {
    const { updateChannels } = this.props

    this.myPlaylists(0)

    socket.on('channels list', function (channels) {
      console.log('client side channels: ', channels);
      updateChannels(channels)
    })
  }

  myPlaylists(offset) {
    fetch(`/api/v1/user/playlists/${offset}`, {
    })
      .then(response => response.json())
      .then(data => this.earsnakkChannels(data, offset))
  }

  earsnakkChannels(data, offset) {
    let playlistArr = data.items

    playlistArr.map(playlist => {
      if (playlist.name.includes('earsnakk_')){
        this.setState({ earsnakkPlaylists: [...this.state.earsnakkPlaylists, playlist] })
      }
    })

    if (data.next !== null || !playlistArr.length){
      this.myPlaylists(offset+50)
    }

  }

  handleClick(e, playlist){
    const playlistId = e.target.id
    socket.emit('channels list', playlist)
    this.props.loadEarsnakkPlaylist(playlist)
  }

  yourPlaylists(){
    if(this.state.earsnakkPlaylists.length){
      return this.state.earsnakkPlaylists.map(playlist => {
        return (
          <Link to={`/channel/${playlist.id}`}>
            <div id={playlist.id} onClick={ (e) => this.handleClick(e, playlist) }>{playlist.name}</div>
          </Link>
        )
      })

    }
  }


  render(){
    return (
      <div className="home-wrapper">
        <Link to="/create-channel" className="button-link">New Channel</Link>
        <Link to="/find-channel" className="button-link">Find A Channel</Link>
        <div className="earsnakk-playlists">
          {this.yourPlaylists()}
        </div>
      </div>
    )
  }
}

export default Home;
