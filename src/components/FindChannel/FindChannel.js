import React from 'react';
import { Link } from 'react-router-dom';
import './FindChannel.css';

const FindChannel = () => {
  return (
    <div className="find-channel-wrapper">
      <h3>Available Channels</h3>
      
      <Link to="/franklin-channel">
        <div className="find-channel-link">
          <p>Franklin Loves Daft Punk</p>
        </div>
      </Link>
      
      <Link to="/franklin-channel">
        <div className="find-channel-link">
          <p>Franklin Loves Daft Punk</p>
        </div>
      </Link>
      
      <Link to="/franklin-channel">
        <div className="find-channel-link">
          <p>Franklin Loves Daft Punk</p>
        </div>
      </Link>
      
    </div>
  );
}

export default FindChannel;