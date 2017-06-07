import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Routes from '../Routes/Routes';
import './CreateChannel.css';

class CreateChannel extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      genres: {},
      userId: '',
    };
  }

  handleSubmit() {
    this.props.createPlaylistPost({ userID: this.props.user.id, name: this.state.name });
  }

  routeToPlaylist(id) {
    this.props.addPlaylistToChannels(this.props.playlist);
    return <Redirect to={`/channel/${id}`}/>;
  }

  render() {
    return (
      <div className="create-channel-wrapper">
        <input
          className="create-channel-input"
          type="text"
          placeholder="Channel Name"
          value={this.state.name}
          onChange={ e => this.setState({ name: e.target.value }) }
        />
        <button className="create-channel-btn" onClick={ e => this.handleSubmit(e) } type="submit">
          Submit Now
        </button>
        {this.props.playlist.id && this.routeToPlaylist(this.props.playlist.id)}
      </div>
    );
  }
}


export default CreateChannel;
