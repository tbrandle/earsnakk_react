import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

let socket = io('http://localhost:3000');
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");


let store = applyMiddleware(socketIoMiddleware, thunk)(createStore)(rootReducer);

export default store;

// const configureStore = () => {
//   const store = createStore(
//     rootReducer,
//     devTools,
//     applyMiddleware(thunk)
//   );
//   return store;
// }

// export default configureStore;
