import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './store';

import App from './components/App/App';
import './index.css';

const store = configureStore();

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
