import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <li className="nav-item">
      <button
        className="nav-item__button--login"
        onClick={() =>
          logout({
            returnTo: window.location.origin
          })
        }
      >
        Log Out
      </button>
    </li>
  );
}

export default LogoutButton;
