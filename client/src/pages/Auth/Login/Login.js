import React, { useEffect } from 'react';

import './Login.css';

import { useForm, validate } from '../../../hooks';

const Login = (props) => {
  console.log('props in Login', props);
  const log = (vals) => console.log(vals);

  const { values, handleChange, handleSubmit } = useForm(props.login, validate);

  useEffect(() => {
    props.redirect && props.history.push(`/profile/${props.appUser.user._id}`);
    return props.setState((prev) => ({
      ...prev,
      redirect: false
    }));
  }, [props.redirect]);

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
    </div>
  );
};

export default Login;
