const fetchedUser = (user) => {
  return {
    type: 'FETCHED_USER',
    user
  }
}

export const profileFetch = (dispatch) => {
  return dispatch => {
    fetch('/profile')
      .then(response => response.json())
      .then(json => dispatch(fetchedUser(json)))
      .catch(error => console.log(error))
  }
}

const loadPlayList = (playlist) => {
  return {
    type: 'PLAYLIST',
    playlist
  }
}

export const loadEarsnakkPlaylist = (playlist, dispatch) => {
  return dispatch => dispatch(loadPlayList(playlist))
}

const createPlayList = (playlist) => {
  return {
    type: 'PLAYLIST',
    playlist
  }
}

export const createPlaylistPost = (dispatch) => {
  const { userID, name } = dispatch
  console.log("dispatch: ", dispatch.userID, dispatch.name);
  return dispatch => {
    fetch('/api/v1/playlist',{
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ userID, name }),
    })
      .then(response => response.json())
      .then(playlist => {
        console.log("playlist: ", playlist);
        dispatch(createPlayList(playlist))
      })
      .catch(error => console.log(error))
  }
}


const sendSongs = (songs) => {
  return {
    type: 'SONGS',
    songs
  }
}

export const fetchSongs = (dispatch) => {
  const { artist, track } = dispatch
  if (artist && track) {

    return dispatch => {
      fetch(`/api/v1/${artist}/${track}/search-tracks`)
      .then(response => response.json())
      .then(songs => dispatch(sendSongs(songs)))
      .catch(error => console.log(error))
    }

  } else if (artist && !track) {

    return dispatch => {
      fetch(`/api/v1/${artist}/search-tracks`)
      .then(response => response.json())
      .then(songs => dispatch(sendSongs(songs)))
      .catch(error => console.log(error))
    }

  }
}
