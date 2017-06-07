const searchSongs = (state = [], action) => {
  switch (action.type) {
    case 'SONGS':
      return [...action.songs.tracks.items];
    default:
      return state;
  }
};

export default searchSongs;
