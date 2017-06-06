import { combineReducers } from 'redux';
import user from './user';
import playlist from './playlist';
import searchSongs from './searchSongs';
import channels from './channels'

const rootReducer = combineReducers({
  playlist,
  user,
  channels,
  searchSongs
});

export default rootReducer;
