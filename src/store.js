import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';


const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  );
  return store;
}

export default configureStore;