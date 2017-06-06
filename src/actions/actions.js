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
  return dispatch => {
    fetch('/api/v1/playlist',{
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ userID, name }),
    })
      .then(response => response.json())
      .then(playlist => { dispatch(createPlayList(playlist)) })
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

export const addPlaylistToChannels = (playlist) => {
  return {
    type: 'ADD_CHANNEL',
    playlist
  }
}

export const removePlaylistFromChannels = (channels) => {
  return {
    type: 'REMOVE_CHANNEL',
    channels
  }
}

export const removePlaylistFromStore = () => {
  return {
    type: 'REMOVE_PLAYLIST_FROM_STORE'
  }
}



export const updateChannels = (playlist) => {
  return {
    type: 'UPDATE_CHANNELS',
    playlist
  }
}

export const channelTrackList = (trackList) => {
  return {
    type: 'ADD_PLAYLIST',
    trackList
  }
}

export const getTracks = (dispatch) => {
  const { ownerID, playlistID } = dispatch
  return dispatch => {
    fetch(`/api/v1/user/${ownerID}/playlist/${playlistID}/tracks`)
    .then(response => response.json())
    .then(trackList => dispatch(channelTrackList(trackList.items)))
    .catch(error => console.log(error))
  }
}
