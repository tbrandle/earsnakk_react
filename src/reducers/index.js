import { combineReducers } from 'redux';
import user from './user';
import playlist from './playlist';
import searchSongs from './searchSongs';
import testReducer from './testReducer';

const rootReducer = combineReducers({
  playlist,
  user,
  searchSongs,
  testReducer
});

export default rootReducer;
