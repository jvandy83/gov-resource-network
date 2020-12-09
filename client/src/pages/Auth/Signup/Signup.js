import React, { useEffect } from 'react';

import { useForm, validate } from '../../../hooks';

import './Signup.css';

const Signup = (props) => {
  const log = (vals) => {
    console.log(vals);
  };

  const { handleChange, values, handleSubmit } = useForm(
    props.signup,
    validate
  );

  useEffect(() => {
    props.redirect && props.history.push(`/login`);
    return props.setState((prev) => ({
      ...prev,
      redirect: false
    }));
  }, [props.redirect]);

  return (
    <div className="signup-root">
      <h1>Signup Page</h1>
      <form className="signup-form">
        <div className="signup-input__field">
          <label>First Name:</label>
          <input
            type="text"
            value={values.firstName || ''}
            name="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="signup-input__field">
          <label>Last Name:</label>
          <input
            type="text"
            value={values.lastName || ''}
            name="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="signup-input__field">
          <label>Email:</label>
          <input
            type="email"
            value={values.email || ''}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="signup-input__field">
          <label>Password:</label>
          <input
            type="password"
            value={values.password || ''}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="signup-input__field">
          <label>Confirm password:</label>
          <input
            type="password"
            value={values.confirmPassword || ''}
            name="confirmPassword"
            onChange={handleChange}
          />
        </div>
      </form>
      <button onClick={handleSubmit}>Sign up</button>
    </div>
  );
};

export default Signup;
