import React, { useEffect, useState } from 'react';

import Loading from '../../../components/Loading/Loading';

import { Redirect } from 'react-router-dom';

import useForm from '../../../hooks/useForm';

import './Register.css';

import axios from 'axios';

const RegisterExperience = (props) => {
  const { user } = props;

  const [appUser, setAppUser] = useState({});
  const [loaded, setLoaded] = useState(false);

  const registerExperience = () => {
    axios
      .put(`http://localhost:5000/api/experience`, {
        headers: {
          'content-type': 'application/json'
        },
        data: {
          ...values,
          appUserId: user.sub
        }
      })
      .then((res) => {
        if (res.status !== 200 || res.status !== 201) {
          const error = `Previous experience could not be added.`;
          console.error(error);
        }
        props.history.push(`/profile/${user.sub}`);
      });
  };

  const log = (vals) => {
    console.log(vals);
  };

  const { handleChange, values, handleSubmit, errors } = useForm(
    registerExperience,
    log
  );

  useEffect(() => {
    const id = user.sub;
    axios.get(`http://localhost:5000/api/auth/me/${id}`).then((res) => {
      if (res.status !== 200) {
        const error = `User does not exist.`;
        console.error(error);
      }
      setAppUser((prev) => ({
        ...prev,
        appUser: res.data.user
      }));
    });
  }, [user.sub]);

  if (!appUser.appUser) {
    return <Loading />;
  }

  return (
    <div className="entryForm-container">
      <div className="entryForm-header">
        <h2>Hello, {appUser.appUser.firstName}! Nice to meet you 😁</h2>
      </div>
      <form className="entryForm">
        <label className="entryForm-label" htmlFor="prevTitle">
          Previous Title
        </label>
        <input
          className="entryForm-input"
          type="text"
          name="prevTitle"
          value={values.prevTitle || ''}
          onChange={handleChange}
        />
        <label className="entryForm-label" htmlFor="prevCompany">
          Previous Company
        </label>
        <input
          className="entryForm-input"
          type="text"
          name="prevCompany"
          value={values.prevCompany || ''}
          onChange={handleChange}
        />
      </form>
      <div className="entryForm-action">
        <button onClick={handleSubmit} className="entryForm-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default RegisterExperience;
