import React, { useState, useEffect } from 'react';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import Network from '../Network/Network';
import Jobs from '../Jobs/Jobs';
import Signup from '../Auth/Signup/Signup';
import Login from '../Auth/Login/Login';

import {
  MainNavigation,
  Loading,
  Settings,
  Backdrop,
  ErrorHandler
} from '../../components';

// styles
import './App.css';

// react-router-dom
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

const App = () => {
  const INITIAL_APP_STATE = {
    showBackdrop: false,
    showMobileNav: false,
    error: null,
    redirect: false
  };

  const [state, setState] = useState(INITIAL_APP_STATE);

  const [appUser, setAppUser] = useState({});

  // const mobileNavHandler = (isOpen) => {
  //   setState({ showMobileNav: isOpen, showBackdrop: isOpen });
  // };

  const backdropClickHandler = () => {
    setState({ showBackdrop: false, showMobileNav: false, error: null });
  };

  const errorHandler = () => {
    setState((prev) => ({
      ...prev,
      error: null
    }));
  };

  const signup = async (values) => {
    const res = await axios({
      url: `http://localhost:5000/v1/api/auth/signup`,
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        ...values
      }
    });
    if (res.status !== 200 && res.status !== 201) {
      console.log('An error occurrd in signup.');
    }
    console.log('User is signed up.');
  };

  const login = async (values) => {
    const res = await axios({
      url: `http://localhost:5000/v1/api/auth/login`,
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        ...values
      }
    });
    if (res.status !== 200 && res.status !== 201) {
      console.log('An error occurred while trying to login user.');
    }
    setAppUser((prev) => ({
      ...prev,
      token: res.data.token
    }));
    setState((prev) => ({
      ...prev,
      redirect: true
    }));
    console.log('Login was successful.');
  };

  return (
    <>
      {state.showBackdrop && <Backdrop onClick={backdropClickHandler} />}
      <ErrorHandler error={state.error} onHandle={errorHandler} />
      <MainNavigation />
      <Switch>
        <Route exact path="/" render={(routeProps) => <Home />} />
        <Route
          path="/signup"
          render={(routeProps) => <Signup signup={signup} {...routeProps} />}
        />
        <Route
          path="/login"
          render={(routeProps) => (
            <Login login={login} redirect={state.redirect} {...routeProps} />
          )}
        />
        <Route
          path="/profile/:id"
          render={(routeProps) => <Profile {...routeProps} />}
        />
        <Route
          path="/network/:id"
          render={(routeProps) => <Network {...routeProps} />}
        />
        <Route path="/jobs/:id" render={(routeProps) => <Jobs />} />
        <Route path="/settings/:id" render={(routeProps) => <Settings />} />
      </Switch>
    </>
  );
};

export default App;
