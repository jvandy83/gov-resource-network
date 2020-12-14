import React, { useState, useEffect } from 'react';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import Network from '../Network/Network';
import Jobs from '../Jobs/Jobs';
import Signup from '../Auth/Signup/Signup';
import Login from '../Auth/Login/Login';
import PrivateRoute from '../Auth/PrivateRoute';

// auth
import { useAuth } from '../../context/auth';

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
import { Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';

const App = (props) => {
  const history = useHistory();

  const { getAccessToken, setAccessToken } = useAuth();

  const INITIAL_APP_STATE = {
    showBackdrop: false,
    showMobileNav: false,
    error: null
  };

  const [state, setState] = useState(INITIAL_APP_STATE);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

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

  const signup = async (vals) => {
    try {
      await axios({
        url: `http://localhost:5000/v1/api/auth/signup`,
        method: 'post',
        data: {
          ...vals
        }
      });
      setRedirect(true);
    } catch (err) {
      console.log('Sign up was not successful');
    }
  };

  const login = async (vals) => {
    try {
      const res = await axios({
        url: `http://localhost:5000/v1/api/auth/login`,
        method: 'post',
        data: {
          ...vals
        }
      });
      if (res.status !== 200 && res.status !== 201) {
        console.log('Could not login user.');
      }
      setLoggedIn(true);
      history.push(`/profile/${res.data.user._id}`);
    } catch (err) {
      console.log('Login was unsuccessful');
    }
  };

  useEffect(() => {
    axios({
      url: `http://localhost:5000/v1/api/auth/refresh_token`,
      method: 'post',
      withCredentials: true
    })
      .then(async (res) => {
        const data = res.data;
        setUser(data.user);
        setAccessToken(res.data.accessToken);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   axios({
  //     url: `http://localhost:5000/v1/api/auth/me`,
  //     method: 'get',
  //     headers: {
  //       Authorization: `Bearer ${getAccessToken()}`
  //     }
  //   })
  //     .then(async (res) => {
  //       const data = await res.data;
  //       console.log(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // if (loading) {
  //   return <Loading />;
  // }

  // console.log('user inside App', user);

  return (
    <>
      {state.showBackdrop && <Backdrop onClick={backdropClickHandler} />}
      <ErrorHandler error={state.error} onHandle={errorHandler} />
      <MainNavigation user={user} />
      <Switch>
        <Route exact path="/" render={(routeProps) => <Home />} />
        <Route
          path="/signup"
          render={(routeProps) => (
            <Signup
              redirect={redirect}
              setRedirect={setRedirect}
              signup={signup}
              setState={setState}
              {...routeProps}
            />
          )}
        />
        <Route
          path="/login"
          render={(routeProps) => (
            <Login login={login} user={user} {...routeProps} />
          )}
        />
        <Route
          path="/profile/:id"
          render={(routeProps) => <Profile user={user} />}
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
