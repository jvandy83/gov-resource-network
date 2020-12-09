import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div id="root">
      <div className="home-header">
        <h1>Government Resource Network</h1>
        <p>
          Gov Resource is a social networking application for government
          contractors.
        </p>
      </div>
      <div className="home-main">
        <p className="home-main-">
          New to Gov-Resource? Sign up now to connect with other government
          contractors.
          <span>
            <Link to={`/signup`}> Sign up</Link>
          </span>
        </p>
        <p>
          Welcome back!
          <span>
            <Link to={`/login`}> Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Home;
