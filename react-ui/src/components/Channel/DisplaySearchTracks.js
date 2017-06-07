import React from 'react'

const DisplaySearchTracks = ({ tracks, addSong }) => {
  if(tracks.length){
    console.log('hey');
    return (
      <div className="search-track-wrapper">
        { tracks.map((track, i) => {
          return (
            <p key={i} className="search-track" onClick={ () => addSong(track.uri) }>track name: {track.name}</p>
          )
        })}
      </div>
    )
  } else {
    return null
  }
}

export default DisplaySearchTracks
