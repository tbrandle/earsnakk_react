const channels = (state=[], action) => {
  switch(action.type) {
    case 'ADD_CHANNEL':
      return [...state, action.playlist];
    case 'UPDATE_CHANNELS':
      return [...state, action.playlist]
    case 'REMOVE_CHANNEL':
      return [...action.channels];
    default:
      return state;
  }
}

export default channels;
