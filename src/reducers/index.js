import { combineReducers } from 'redux';
import user from './user';
import playlist from './playlist';
import createHandlers from './handlers';

const rootReducer = combineReducers({
  playlist,
  user,
  createHandlers
});

export default rootReducer;
