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
