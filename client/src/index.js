import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { App } from './pages';
import { Auth0ProviderWithHistory } from './pages';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById('root')
);
