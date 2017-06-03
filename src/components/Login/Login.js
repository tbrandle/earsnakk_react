import React from 'react';
import './Login.css'

const spotifyAuth = () => {
  fetch('/auth/spotify')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error))
}

const Login = () => {
  return (
    <div>
      <h1>welcom to earsnakk</h1>
      <p>click here to login with Spotify and start sharing music with your friends</p>
      <a className="login-link" href="http://localhost:8888/auth/spotify">Login</a>
    </div>
  )
}

export default Login;
