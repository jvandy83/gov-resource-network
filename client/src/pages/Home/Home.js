import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './Home.css';

const Home = (props) => {
  const { loginWithRedirect } = useAuth0();
  console.log('props from inside home page', props);
  return (
    <div id="home-root">
      <div className="home-header">
        <h1 className="home-header__title">Government Resource Network</h1>
        <div className="header-header__content">
          <p>A one stop shop for all government resources. </p>
          <p>
            First, are you a government agency looking for a good or service?
            <span>
              <button onClick={loginWithRedirect}>Create profile</button>
            </span>
          </p>
          <p>
            Are you a provider of a good or service for government entities?
            <span>
              <button onClick={loginWithRedirect}>Create profile</button>
            </span>
          </p>
          <p>
            Do you already have a profile with Government Resource Network
            <span>
              <button onClick={loginWithRedirect}>Sign In</button>
            </span>
          </p>
          <p>
            Looking for more information about what Government Resource Network
            has to offer...{' '}
            <span>
              <button>Resources</button>
            </span>
          </p>
        </div>
      </div>
      <div className="home-main">
        <h2 className="home-main__title">Next Section</h2>
      </div>
    </div>
  );
};

export default Home;
