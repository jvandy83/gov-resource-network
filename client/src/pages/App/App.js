import React from 'react';
import LandingPage from '../LandingPage/LandingPage';
import Profile from '../Profile/Profile';
import Network from '../Network/Network';
import Jobs from '../Jobs/Jobs';
import { MainNavigation } from '../../components';
import { Settings } from '../../components';

// styles
import './App.css';

// hooks
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';

// react-router-dom
import { Route, Switch } from 'react-router-dom';

const App = () => {
  // Make api call to database in useEffect
  // and then update state to show data from user
  // forms on profile page
  //
  // Construct state like
  /* 
  state {
    education: {
      school: '',
      degree: '',
      from: '',
      to: ''
    }
  }
  Then pass state as props to build out profile page
  */

  const { isLoading, isAuthenticated, user } = useAuth0();

  // const ProtectedRoute = ({ component, ...args }) => (
  //   <Route component={withAuthenticationRequired(component)} {...args} />
  // );

  // Create <Loading /> component i.e. spinner
  if (isLoading) {
    return 'Loading...';
  }

  return (
    <>
      <MainNavigation user={user} isAuth={isAuthenticated} />
      <Switch>
        <Route exact path="/" render={(routeProps) => <LandingPage />} />
        <Route
          path="/profile/:id"
          render={(routeProps) => <Profile user={user} />}
        />
        <Route path="/network/:id" component={Network} />
        <Route path="/jobs/:id" component={Jobs} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </>
  );
};

export default App;
