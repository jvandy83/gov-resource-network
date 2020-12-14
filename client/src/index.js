import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App/App';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { AuthContext } from './context/auth';

import { setAccessToken, getAccessToken } from './pages/accessToken';

const history = createBrowserHistory();

ReactDOM.render(
  <AuthContext.Provider value={{ getAccessToken, setAccessToken }}>
    <Router history={history}>
      <App />
    </Router>
  </AuthContext.Provider>,
  document.getElementById('root')
);
