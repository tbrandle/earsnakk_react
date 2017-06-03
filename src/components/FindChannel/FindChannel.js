import React from 'react';
import { Link } from 'react-router-dom';
import './FindChannel.css';

const FindChannel = () => {
  return (
    <div>
      <h3>Available Channels</h3>
      <Link to="/franklin-channel"><p>Franklin Loves Daft Punk</p></Link>
      <p>DJ Llama</p>
      <p>Born to Rage</p>
    </div>
  );
}

export default FindChannel;