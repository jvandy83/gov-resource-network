import React, { useState } from 'react';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import Network from '../Network/Network';
import Jobs from '../Jobs/Jobs';
import Register from '../Register/Register';
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

const App = () => {
  const { isLoading, isAuthenticated, user } = useAuth0();
  console.log(user);

  const INITIAL_APP_STATE = {
    showBackdrop: false,
    showMobileNav: false,
    isAuth: false,
    user_id: null,
    error: null
  };

  const [state, setState] = useState(INITIAL_APP_STATE);

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

  return (
    <>
      {state.showBackdrop && <Backdrop onClick={backdropClickHandler} />}
      <ErrorHandler error={state.error} onHandle={errorHandler} />

      <MainNavigation user={user} isAuth={isAuthenticated} />
      {isLoading ? (
        <Loading />
      ) : (
        <Switch>
          <Route exact path="/" render={(routeProps) => <Home user={user} />} />
          <Route
            path="/profile/new-user"
            render={(routeProps) => <Register {...routeProps} user={user} />}
          />
          <Route
            path="/profile/:id"
            render={(routeProps) => <Profile {...routeProps} user={user} />}
          />
          <Route
            path="/network/:id"
            render={(routeProps) => <Network {...routeProps} user={user} />}
          />
          <Route
            path="/jobs/:id"
            render={(routeProps) => <Jobs user={user} />}
          />
          <Route
            path="/settings/:id"
            render={(routeProps) => <Settings user={user} />}
          />
        </Switch>
      )}
    </>
  );
};

export default App;
