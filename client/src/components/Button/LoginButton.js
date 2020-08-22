import React from 'react';
import './Button.css';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="login-button button" onClick={loginWithRedirect}>
      Log in
    </button>
  );
}

export default LoginButton;
