import React, { useState, useEffect } from 'react';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import Network from '../Network/Network';
import Jobs from '../Jobs/Jobs';
import RegisterName from '../Profile/Register/RegisterName';
import RegisterExperience from '../Profile/Register/RegisterExperience';
import {
  MainNavigation,
  Loading,
  Settings,
  Backdrop,
  ErrorHandler
} from '../../components';

// styles
import './App.css';

// hooks
import { useAuth0 } from '@auth0/auth0-react';

// react-router-dom
import { Route, Switch } from 'react-router-dom';

// 3rd parties
import axios from 'axios';

const App = () => {
  const { isLoading, isAuthenticated, user } = useAuth0();

  const INITIAL_APP_STATE = {
    showBackdrop: false,
    showMobileNav: false,
    isAuth: false,
    error: null
  };

  const [state, setState] = useState(INITIAL_APP_STATE);

  const [appUser, setAppUser] = useState({
    isNewUser: true
  });

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

  const createProfile = async (values) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/profile`, {
        headers: {
          'Content-Type': 'application/json'
        },
        body: { ...values, user_id: user.sub }
      });
      if (res.status !== 200 && res.status !== 201) {
        const err = new Error(
          'There was an error that occurred while trying to create or update a profile.'
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {state.showBackdrop && <Backdrop onClick={backdropClickHandler} />}
      <ErrorHandler error={state.error} onHandle={errorHandler} />

      <MainNavigation user={user} appUser={appUser} isAuth={isAuthenticated} />

      {isLoading ? (
        <Loading />
      ) : (
        <Switch>
          <Route
            exact
            path="/"
            render={(routeProps) => <Home appUser={appUser} user={user} />}
          />
          <Route
            exact
            path="/register"
            render={(routeProps) => (
              <RegisterName {...routeProps} user={user} />
            )}
          />
          <Route
            path="/register/:id"
            render={(routeProps) => (
              <RegisterExperience {...routeProps} user={user} />
            )}
          />
          <Route
            path="/profile/:id"
            render={(routeProps) => (
              <Profile
                {...routeProps}
                user={user}
                createProfile={createProfile}
              />
            )}
          />
          <Route
            path="/network/:id"
            render={(routeProps) => (
              <Network
                {...routeProps}
                user={user}
                createProfile={createProfile}
              />
            )}
          />
          <Route
            path="/jobs/:id"
            render={(routeProps) => (
              <Jobs user={user} createProfile={createProfile} />
            )}
          />
          <Route
            path="/settings/:id"
            render={(routeProps) => (
              <Settings user={user} createProfile={createProfile} />
            )}
          />
        </Switch>
      )}
    </>
  );
};

export default App;
