import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading/Loading';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './Home.css';

import axios from 'axios';

const Home = (props) => {
  const { loginWithRedirect } = useAuth0();

  const { user } = props;

  const [appUser, setAppUser] = useState({});

  useEffect(() => {
    const id = user && user.sub;
    axios.get(`http://localhost:5000/api/auth/me/${id}`).then((res) => {
      if (res.status !== 200) {
        console.log('Current user is a new user.');
      } else {
        setAppUser((prev) => ({
          ...prev,
          appUser: res.user
        }));
      }
    });
  }, [user]);

  const handleClick = async () => {
    try {
      await loginWithRedirect({
        redirectUri: 'http://localhost:3000/register'
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (!appUser) {
    return <Loading />;
  }

  return !appUser.isAppUser ? (
    <div id="home-root">
      <div className="home-header">
        <h1 className="home-header__title">Government Resource Network</h1>
        <div className="header-header__content">
          <p>A one stop shop for all government resources. </p>
          <p>
            First, are you a government agency looking for a good or service?
            <span>
              <button onClick={handleClick}>Create profile</button>
            </span>
          </p>
          <p>
            Are you a provider of a good or service for government entities?
            <span>
              <button onClick={handleClick}>Create profile</button>
            </span>
          </p>
          <p>
            Do you already have a profile with Government Resource Network
            <span>
              <button onClick={handleClick}>Sign In</button>
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
  ) : null;
};

export default Home;
