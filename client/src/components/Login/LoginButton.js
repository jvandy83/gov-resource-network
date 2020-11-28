import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton(props) {
  const { loginWithRedirect, logout } = useAuth0();

  const handleClick = async () => {
    try {
      await loginWithRedirect({
        redirectUri: 'http://localhost:3000/register'
      });
    } catch (err) {
      console.log(err);
    }
  };

  return props.appUser && props.appUser ? (
    <li className="nav-item">
      <button className="nav-item__button--login" onClick={handleClick}>
        Log in
      </button>
    </li>
  ) : (
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

export default LoginButton;
