const trackList = (state=[], action) => {
  switch(action.type) {
    case 'ADD_PLAYLIST':
      return [...action.trackList];
    default:
      return state;
  }
}

export default trackList;
