import React from 'react';
import LoginButton from '../../Button/Login/LoginButton';
import LogoutButton from '../../Button/Login/LogoutButton';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './MainNavigation.css';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import WorkIcon from '@material-ui/icons/Work';
import SettingsIcon from '@material-ui/icons/Settings';

const Nav = ({ user }) => {
  const { isAuthenticated } = useAuth0();
  const renderAuthNav = () => {
    return isAuthenticated ? (
      <div className="nav">
        <ul className="nav-links">
          <li className="nav-item nav-logo">
            <Link className="logo nav-item__link" to="/">
              GovLink
            </Link>
          </li>
          <li className="nav-item nav-item__messaging">
            <Link
              className="nav-item__link nav-item__link--underline"
              to="/network"
            >
              <span id="network-tab__icon" className="nav-item__icon">
                <PeopleAltIcon />
              </span>
              <span className="nav-item__title">Network</span>
            </Link>
          </li>
          <li className="nav-item nav-item__jobs">
            <Link
              className="nav-item__link nav-item__link--underline"
              to={`/jobs/${user.sub}`}
            >
              <span className="nav-item__icon">
                <WorkIcon />
              </span>
              <span className="nav-item__title">Jobs</span>
            </Link>
          </li>
          <li className="nav-item nav-item__settings">
            <Link
              className="nav-item__link nav-item__link--underline"
              to="/settings"
            >
              <span className="nav-item__icon">
                <SettingsIcon />
              </span>
              <span className="nav-item__title">Settings</span>
            </Link>
          </li>
          <li id="profile-nav__item" className="nav-item nav-item__profile">
            <div className="nav-item__content nav-item__link--underline">
              <div id="nav-settings__dropdown" className="nav-item__dropdown ">
                <Link className="nav-item__link " to={`/profile/${user.sub}`}>
                  <img
                    className="nav-item__profile-member--photo"
                    src={user.picture}
                    alt="profile"
                  />
                  <div className="nav-item__title--container ">
                    <span className="nav-item__title">Me</span>
                    <ArrowDropDownIcon className="nav-item__dropdown-trigger--icon" />
                  </div>
                </Link>
              </div>
            </div>
          </li>
          <LogoutButton />
        </ul>
      </div>
    ) : (
      <div className="nav">
        <ul className="nav-links">
          <li className="nav-item nav-logo">
            <Link className="logo nav-item__link" to="/">
              GovLink
            </Link>
          </li>
          <LoginButton />
        </ul>
      </div>
    );
  };
  return <>{renderAuthNav()}</>;
};

export default Nav;
