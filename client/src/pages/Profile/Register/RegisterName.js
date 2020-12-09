import React, { useEffect, useState } from 'react';

import RegisterExperience from './RegisterExperience';

import { Redirect } from 'react-router-dom';

import Loading from '../../../components/Loading/Loading';

import Button from '../../../components/Button/Button';

import useForm from '../../../hooks/useForm';

// Styles
import './Register.css';
import axios from 'axios';

const RegisterName = (props) => {
  const { user } = props;

  const [appUser, setAppUser] = useState({});

  const registerUser = () => {
    axios
      .post(
        `http://localhost:5000/api/profile/register`,
        {
          headers: {
            'content-type': 'application/json'
          }
        },
        {
          data: {
            ...values,
            appUserId: user.sub,
            isAppUser: true,
            // normalize APP user so
            // that data in custom DB
            // matches data from Auth0

            email: user.email,
            email_verified: user.email_verified,
            family_name: user.family_name,
            given_name: user.given_name,
            locale: user.locale,
            nickname: user.nickname,
            picture: user.picture,
            sub: user.sub
          }
        }
      )
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          const err =
            'There was an error that occurred while trying to create or update a profile.';
          console.log(err);
        }
        props.history.push(`/register/${user.sub}`);
      })
      .catch((err) => console.log(err));
  };

  const log = (vals) => {
    console.log(vals);
  };

  const { handleChange, handleSubmit, errors, values } = useForm(
    registerUser,
    log
  );

  useEffect(() => {
    const id = user.sub;
    axios.get(`http://localhost:5000/api/auth/me/${id}`).then((res) => {
      console.log(res);
      if (res.status !== 200) {
        const error = `User does not exist.`;
        console.error(error);
      } else {
        setAppUser((prev) => ({
          ...prev,
          appUser: res.data.user
        }));
      }
    });
  }, [user.sub, appUser.appUserId]);

  console.log(appUser);

  return !appUser.isAppUser ? (
    <div id="RegisterRoot">
      <div className="entryForm-container">
        <div className="entryForm-header">
          <h2>Start your profile...</h2>
        </div>
        <form className="entryForm">
          <label className="entryForm-label" htmlFor="firstName">
            First Name:{' '}
          </label>
          <input
            className="entryForm-input"
            type="text"
            name="firstName"
            value={values.firstName || ''}
            onChange={handleChange}
          />
          <label className="entryForm-label" htmlFor="lastName">
            Last Name:{' '}
          </label>
          <input
            className="entryForm-input"
            type="text"
            name="lastName"
            value={values.lastName || ''}
            onChange={handleChange}
            style={{ marginBottom: '1rem' }}
          />
        </form>
        <div className="entryForm-action">
          <button onClick={handleSubmit} className="entryForm-button">
            Next
          </button>
        </div>
      </div>
    </div>
  ) : (
    <RegisterExperience user={appUser} />
  );
};

export default RegisterName;
