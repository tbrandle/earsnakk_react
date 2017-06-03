import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.profileFetch()
  }

  render(){
    return (
      <div className="home-wrapper">
        <Link to="/create-channel"><button>New Channel</button></Link>
        <Link to="/find-channel"><button>Find A Channel</button></Link>
      </div>
    )
  }
}


export default Home;
