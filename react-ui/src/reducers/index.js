import { combineReducers } from 'redux';
import user from './user';
import playlist from './playlist';
import searchSongs from './searchSongs';
import channels from './channels'
import trackList from './trackList'

const rootReducer = combineReducers({
  playlist,
  user,
  channels,
  trackList,
  searchSongs
});

export default rootReducer;
