import React, { Component } from 'react';
// import { Link } from 'react-router';

class Home extends Component {
  constructor() {
    super()
    this.state = {
      user: {}
    }
  }

  componentDidMount(){
    this.profileFetch()
  }

   profileFetch(){
      fetch('/butts')
        .then(res => res.json())
        .then(releases => console.log(releases))
        .catch(error => console.log(error))
   }

  render(){
    return (
      <div className="home-wrapper">
        <h1 className="logo">earsnakk</h1>
        <h3>Create Channel</h3>
        <input type="text" placeholder="New Channel" />
        <button>New Channel</button>
      </div>
    )
  }
}


export default Home;
