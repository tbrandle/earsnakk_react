const playlist = (state={}, action) => {
  switch(action.type) {
    case 'PLAYLIST':
      return {...state, ...action.playlist};
    default:
      return state;
  }
}

export default playlist;
