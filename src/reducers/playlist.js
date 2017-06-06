const playlist = (state={}, action) => {
  switch(action.type) {
    case 'PLAYLIST':
      return {...state, ...action.playlist};
    case 'EXIT_CHANNEL':
      return {};
    default:
      return state;
  }
}

export default playlist;
