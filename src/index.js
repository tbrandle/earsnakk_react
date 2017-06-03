import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import Routes from './components/Routes/Routes';
import './index.css';

const Root = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}

render(<Root />, document.getElementById('root'));
registerServiceWorker();
