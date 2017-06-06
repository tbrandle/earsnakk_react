import React from 'react'

const TrackList = ({ tracks }) => {
  return (
    <div className="track-container">
      {tracks.map({ track } => {
        return(
          <div key={track.id}>{track.name}</div>
        )
      })}
    </div>
  )
}

export default TrackList
