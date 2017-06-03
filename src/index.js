import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';


import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';
import Routes from './components/Routes/Routes';
import './index.css';

const store = configureStore();

const Root = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  )
}

render(<Root />, document.getElementById('root'));
registerServiceWorker();
