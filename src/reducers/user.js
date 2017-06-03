const profile = (state={}, action) => {
  switch(action.type) {
    case 'FETCHED_USER':
      return action.user;
    default:
      return state;
  }
}

export default profile;