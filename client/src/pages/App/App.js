import React, { useState, useEffect } from 'react';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import Network from '../Network/Network';
import Jobs from '../Jobs/Jobs';
import {
  MainNavigation,
  Loading,
  Settings,
  Backdrop,
  ModalProvider,
  ErrorHandler
} from '../../components';

// styles
import './App.css';

// hooks
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';

// react-router-dom
import { Route, Switch } from 'react-router-dom';

// 3rd party libraries
import axios from 'axios';

const App = () => {
  const { isLoading, isAuthenticated, user } = useAuth0();

  const INITIAL_FORM_STATE = {
    showIntroForm: false,
    showEduForm: false,
    showSocialForm: false,
    showExperienceForm: false,
    showAboutMeForm: false,
    showAccompForm: false,
    showContactForm: false
  };

  const INITIAL_APP_STATE = {
    showBackdrop: false,
    showMobileNav: false,
    isAuth: false,
    user_id: null,
    error: null
  };

  const [state, setState] = useState(INITIAL_APP_STATE);

  const [forms, setShowForms] = useState(INITIAL_FORM_STATE);

  const mobileNavHandler = (isOpen) => {
    setState({ showMobileNav: isOpen, showBackdrop: isOpen });
  };

  const backdropClickHandler = () => {
    setState({ showBackdrop: false, showMobileNav: false, error: null });
  };

  const errorHandler = () => {
    setState((prev) => ({
      ...prev,
      error: null
    }));
  };

  // Create <Loading /> component i.e. spinner

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {state.showBackdrop && <Backdrop onClick={backdropClickHandler} />}
      <ErrorHandler error={state.error} onHandle={errorHandler} />
      {/* <ModalProvider> */}
      <MainNavigation user={user} isAuth={isAuthenticated} />
      <Switch>
        <Route exact path="/" render={(routeProps) => <Home user={user} />} />
        <Route
          path="/profile/:id"
          render={(routeProps) => (
            <Profile
              {...routeProps}
              forms={forms}
              setShowForms={setShowForms}
              forms={forms}
              user={user}
            />
          )}
        />
        <Route
          path="/network/:id"
          render={(routeProps) => <Network {...routeProps} user={user} />}
        />
        <Route path="/jobs/:id" render={(routeProps) => <Jobs user={user} />} />
        <Route
          path="/settings/:id"
          render={(routeProps) => <Settings user={user} />}
        />
      </Switch>
      {/* </ModalProvider> */}
    </>
  );
};

export default App;
