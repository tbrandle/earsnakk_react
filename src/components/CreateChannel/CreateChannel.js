import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CreateChannel.css'

class CreateChannel extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      genres: {},
      userId: ''
    }
  }

  componentDidMount(){
    this.setState({ userId: this.props.user.id })
  }


  handleSubmit = () => {
    this.props.createPlaylistPost({userID: this.state.userId, name: this.state.name})
  }


  test() {
    fetch('/api/v1/user/playlists')
      .then(response => response.json())
      .then(data => console.log(data))
  }

  render(){
    return (
      <div className="create-channel-wrapper">
        <input
          className="create-channel-input"
          type="text"
          placeholder="Channel Name"
          value={this.state.name}
          onChange={(e) =>  this.setState({ name: e.target.value }) }
          />
        <form className="create-channel-form">
          <fieldset>
            <legend>Choose Channel Genres</legend>
            <input type="checkbox" name="genres" value="Hiphop" />Hiphop <br />
            <input type="checkbox" name="genres" value="EDM" />EDM<br />
            <input type="checkbox" name="genres" value="Rock" />Rock<br />
            <input type="checkbox" name="genres" value="All Genres" />All Genres<br />
          </fieldset>
        </form>
        <Link to="/channel" className="create-channel-btn" onClick={(e) => this.handleSubmit(e) } type="submit">
          Submit Now
        </Link>
        <button onClick={ () => this.test() }>TEST BUTTON</button>
      </div>
    )
  }
}


export default CreateChannel;
