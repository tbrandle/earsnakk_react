import React from 'react';
import './Login.css';

const Login = () => {

  return (
    <div className="login-wrapper">
      <h1>welcome to <span className="logo">earsnakk</span></h1>
      <p>click here to login with Spotify and start</p>
      <p>sharing music with your friends</p>
      <a className="login-link" href="/auth/spotify">Login</a>
    </div>
  )
}

export default Login;
