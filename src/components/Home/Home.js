import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
    }
  }

  componentWillMount(){
    this.props.profileFetch()
  }

  componentDidMount(page) {
    let offset = page || 0
    this.myPlaylists(offset)
  }

  // newChannel(){
  //   fetch()
  // }

  myPlaylists(offset) {
    fetch(`/api/v1/user/playlists/${offset}`, {
    })
      .then(response => response.json())
      .then(data => this.earsnakkChannels(data))
  }

  earsnakkChannels(data) {
    console.log(data)
  }


  render(){
    return (
      <div className="home-wrapper">
        <Link to="/create-channel" className="button-link">New Channel</Link>
        <Link to="/find-channel" className="button-link">Find A Channel</Link>
      </div>
    )
  }
}


export default Home;
