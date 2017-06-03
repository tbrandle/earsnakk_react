const fetchedUser = (user) => {
  console.log("inside action");
  return {
    type: 'FETCHED_USER',
    user
  }
}

export const profileFetch = (dispatch) => {
  console.log("inside thunk");
  return dispatch => {
    fetch('/profile')
      .then(response => response.json())
      .then(json => dispatch(fetchedUser(json.user)))
      .catch(error => console.log(error))
  }
}
