import React from 'react';
import './Login.css'

const Login = () => {
  return (
    <div>
      <h1>welcome to <span className="logo">earsnakk</span></h1>
      <p>click here to login with Spotify and start sharing music with your friends</p>
      <a className="login-link" href="http://localhost:8888/auth/spotify">Login</a>
    </div>
  )
}

export default Login;
