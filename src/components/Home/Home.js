import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.profileFetch()
  }

  // newChannel(){
  //   fetch()
  // }

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
