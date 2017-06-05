import { combineReducers } from 'redux';
import user from './user';
import playlist from './playlist';
import searchSongs from './searchSongs';

const rootReducer = combineReducers({
  playlist,
  user,
  searchSongs
});

export default rootReducer;
