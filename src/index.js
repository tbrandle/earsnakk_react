import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
import store from './store';

import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
// import configureStore from './store';

import './index.css';

// const store = configureStore();

store.subscribe(() => {
  console.log('new client state', store.getState());
});

store.dispatch({
  type: 'server/hello',
  data: 'Hello'
});

const Root = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}

render(<Root />, document.getElementById('root'));
registerServiceWorker();
