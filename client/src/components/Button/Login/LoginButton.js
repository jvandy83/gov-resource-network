import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  const handleClick = async () => {
    await loginWithRedirect({
      redirectUri: 'http://localhost:3000/profile/new-user'
    });
  };

  return (
    <li className="nav-item">
      <button className="nav-item__button--login" onClick={handleClick}>
        Log in
      </button>
    </li>
  );
}

export default LoginButton;
