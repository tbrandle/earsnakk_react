import React from 'react';
// import { Link } from 'react-router';

const Home = () => {
  return (
    <div className="home-wrapper">
      <h1 className="logo">earsnakk</h1>
      <h3>Create Channel</h3>
      <input type="text" placeholder="New Channel" />
      <button>New Channel</button>
    </div>
  )
}

export default Home;
