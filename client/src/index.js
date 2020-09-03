import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App/App';
import Auth0ProviderWithHistory from './pages/Auth/Auth0ProviderWithHistory';
import { Router } from 'react-router-dom';
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
