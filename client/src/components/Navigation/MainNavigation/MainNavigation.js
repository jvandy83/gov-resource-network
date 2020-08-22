import React from 'react';
import LoginButton from '../../Button/LoginButton';
import LogoutButton from '../../Button/LogoutButton';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './MainNavigation.css';

const Nav = ({ user }) => {
  const { isAuthenticated } = useAuth0();
  const renderAuthNav = () => {
    return (
      isAuthenticated && (
        <>
          <li>
            <Link className="nav-link" to="/network">
              Network
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/jobs">
              Jobs
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/settings">
              Settings
            </Link>
          </li>
          <li>
            <Link className="nav-link" to={`/profile/${user.sub}`}>
              <img
                className="nav-item__profile-member-photo"
                src={user.picture}
                alt="profile-picture"
              />
            </Link>
          </li>
        </>
      )
    );
  };
  return (
    <div className="nav">
      <ul className="nav-links">
        <li className="nav-login nav-link">
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </li>
        <li className="nav-logo">
          <Link className="logo" to="/">
            Gov Resource
          </Link>
        </li>
        {renderAuthNav()}
      </ul>
    </div>
  );
};

export default Nav;
