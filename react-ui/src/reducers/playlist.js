const playlist = (state = {}, action) => {
  switch (action.type) {
    case 'PLAYLIST':
      return { ...state, ...action.playlist };
    case 'REMOVE_PLAYLIST_FROM_STORE':
      return {};
    default:
      return state;
  }
};

export default playlist;
