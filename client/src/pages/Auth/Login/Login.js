import React, { useEffect, useState } from 'react';

import { Redirect, Link } from 'react-router-dom';

import './Login.css';

import { useForm, validate } from '../../../hooks';

import { useAuth } from '../../../context/auth';

import axios from 'axios';

const Login = (props) => {
  console.log('props inside Login', props);

  const { setAccessToken } = useAuth();

  const [isLoggedIn, setLoggedIn] = useState(false);

  const { values, handleChange, handleSubmit } = useForm(props.login, validate);

  return (
    <div className="login-root">
      <h1>Login Page</h1>
      <form className="login-form">
        <div className="login-input__field">
          <label>Email:</label>
          <input
            type="email"
            value={values.email || ''}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="login-input__field">
          <label>Password:</label>
          <input
            type="password"
            value={values.password || ''}
            name="password"
            onChange={handleChange}
          />
        </div>
      </form>
      <button onClick={handleSubmit}>Login</button>
      <div>
        <p>Don't have an account?</p>
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
