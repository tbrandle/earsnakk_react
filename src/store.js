import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import { createClient } from 'redux-socket.io-connect';
import io from 'socket.io-client';
 

const socket = io();
const client = createClient(socket);
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const configureStore = () => {
  const store = createStore(
    rootReducer,
    devTools,
    client,
    applyMiddleware(thunk)
  );
  return store;
}

export default configureStore;
