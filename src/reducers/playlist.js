const playlist = (state={}, action) => {
  console.log('playlist reducer');
  switch(action.type) {
    case 'PLAYLIST':
      return {...state, ...action.playlist};
    default:
      return state;
  }
}

export default playlist;
