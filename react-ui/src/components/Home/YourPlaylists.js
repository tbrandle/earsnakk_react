import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import Routes from '../Routes/Routes';


const YourPlaylists = ({ playlists, handleClick }) => {
  return (
    <div className="earsnakk-playlists">
      { playlists.map((playlist, i) => {
        return(
          <Link key={i} to={`/channel/${playlist.id}`}>
            <div key={playlist.id} onClick={ (playlist) => handleClick(playlist) }>Owner: {playlist.name}</div>
          </Link>
        )
      })}
    </div>
  )
}

export default YourPlaylists
