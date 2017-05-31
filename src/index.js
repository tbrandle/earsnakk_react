import React from 'react';
import { render } from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { BrowserRouter } from 'react-router';
import Routes from './components/Routes';

const Root = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}

render(<Root />, document.getElementById('root'));
