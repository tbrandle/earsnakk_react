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
      .then(playlist => {
        dispatch(createPlayList(playlist))
      })
      .catch(error => console.log(error))
  }
}

export const sendUri = (uri) => {
  return {
    type: 'SEND_URI',
    meta: {
      emit: true
    },
    uri
  }
}

