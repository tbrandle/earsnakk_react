import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount(){
    this.props.profileFetch()
  }

  profileFetch(){
    fetch('/profile')
    .then(res => res.json())
    .then(user => this.setState({ user }))
    .catch(error => console.log(error))
  }

  newChannel(){
    fetch()
  }

  render(){
    return (
      <div className="home-wrapper">
        <h3>Create Channel</h3>
        <input type="text" placeholder="New Channel" />
        <Link to="/create-channel"><button>New Channel</button></Link>
      </div>
    )
  }
}


export default Home;
