import React from 'react';

import Modal from '../Modal/Modal';

import Backdrop from '../Backdrop/Backdrop';

import { useForm, validate } from '../../hooks';
import axios from 'axios';

const ExperienceForm = (props) => {
  const createExperience = (data) => {
    axios
      .put(
        'http://localhost:5000/api/experience',
        {
          data: { ...data, auth_0_user: props.user.sub }
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Creating a user profile failed!');
        }
        console.log('Created or updated experience object');
      })
      .then((res) => {
        console.log('Success, experience object has been created or updated!');
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const { values, handleChange, handleSubmit, clearInput } = useForm(
    createExperience,
    validate
  );
  const handleClearInput = (e) => {
    e && e.preventDefault();
    clearInput();
  };
  return (
    <>
      <Backdrop onClick={props.onCancelModal} />
      <Modal
        title="Edit Experience"
        // acceptEnabled={state.formIsValid}
        onCancelModal={props.onCancelModal}
        onAcceptModal={handleSubmit}
        // isLoading={props.loading}
      >
        <form onSubmit={handleSubmit}>
          <div className="work-history">
            <div className="input-field">
              <label htmlFor="prevTitle">Title</label>
              <input
                type="text"
                name="prevTitle"
                id="prevTitle"
                value={values.prevTitle || ''}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="prevCompany">Company</label>
              <input
                type="text"
                name="prevCompany"
                id="prevCompany"
                onChange={handleChange}
                value={values.prevCompany || ''}
              />
            </div>
            <div className="input-field">
              <label htmlFor="prevLocation">Location</label>
              <input
                type="text"
                name="prevLocation"
                id="prevLocation"
                onChange={handleChange}
                value={values.prevLocation || ''}
              />
            </div>
            <div className="input-field">
              <label htmlFor="prevFrom">From</label>
              <input
                type="date"
                name="prevFrom"
                id="prevFrom"
                onChange={handleChange}
                value={values.prevFrom || ''}
              />
            </div>
            <div className="input-field">
              <label htmlFor="prevTo">To</label>
              <input
                type="date"
                name="prevTo"
                id="prevTo"
                onChange={handleChange}
                value={values.prevTo || ''}
              />
            </div>
            <div className="input-field__checkbox">
              <label htmlFor="currentJob">
                I am currently working in this role:{' '}
              </label>
              <input
                type="checkbox"
                name="currentJob"
                id="currentJob"
                value="currentJob"
                checked={values.currentJob || ''}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="prevDescription">Job Description</label>
              <textarea
                name="prevDescription"
                id="prevDescription"
                rows="4"
                value={values.prevDescription || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="submit-buttons">
            <button className="button-save">Save</button>
            <button className="clear-button" onClick={handleClearInput}>
              Clear
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ExperienceForm;
