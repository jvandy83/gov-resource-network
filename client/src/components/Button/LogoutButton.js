import React from 'react';
import './Button.css';
import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({
          returnTo: window.location.origin
        })
      }
      className="button"
    >
      Log Out
    </button>
  );
}

export default LogoutButton;
