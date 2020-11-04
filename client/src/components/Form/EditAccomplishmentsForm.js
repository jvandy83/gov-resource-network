import React from 'react';
import { useForm, validate } from '../../hooks';
import axios from 'axios';

import { useAuth0 } from '@auth0/auth0-react';

import Modal from '../Modal/Modal';

import Backdrop from '../Backdrop/Backdrop';

import './Form.css';

const AccomplishmentsForm = (props) => {
  const { user } = useAuth0();

  const createAccomplishments = (values) => {
    axios
      .put('http://localhost:5000/api/accomplishments', {
        data: { ...values, auth_0_user: user.sub },
        headers: { 'Content-Type': 'application/json' }
      })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed to create new accomplishments');
        }
      })
      .then((res) => {
        console.log('Created or updated new accomplishments');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { values, handleChange, handleSubmit, clearInput } = useForm(
    createAccomplishments,
    validate
  );

  const handleClearInput = (e) => {
    e && e.preventDefault();
    clearInput(values);
  };

  return (
    <>
      <Backdrop onClick={() => props.onCancelModal(props.mode)} />
      <Modal
        title="Edit Accomplishments"
        // acceptEnabled={state.formIsValid}
        onCancelModal={() => props.onCancelModal(props.mode)}
        onAcceptModal={handleSubmit}
        // isLoading={props.loading}
      >
        <form>
          <div className="input-field">
            <label htmlFor="publications">Publications</label>
            <input
              type="text"
              name="publications"
              id="publications"
              value={values.publications || ''}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="patents">Patents</label>
            <input
              type="text"
              name="patents"
              id="patents"
              value={values.patents || ''}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="projects">Projects</label>
            <input
              type="text"
              name="projects"
              id="projects"
              value={values.projects || ''}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="courses">Courses</label>
            <input
              type="text"
              name="courses"
              id="courses"
              value={values.courses || ''}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="organizations">Organizations</label>
            <input
              type="text"
              name="organizations"
              id="organizations"
              value={values.organizations || ''}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="languages">Languages</label>
            <input
              type="text"
              name="languages"
              id="languages"
              value={values.languages || ''}
              onChange={handleChange}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AccomplishmentsForm;
