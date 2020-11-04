import React from 'react';

import Modal from '../Modal/Modal';

import Backdrop from '../Backdrop/Backdrop';

import './Form.css';

import { useForm, validate } from '../../hooks';

const EditContactForm = (props) => {
  const { values, handleChange, handleSubmit, clearInput } = useForm(
    props.createProfile,
    validate
  );
  console.log('inside editContactForm', props);

  return (
    <>
      <Backdrop onClick={() => props.onCancelModal(props.mode)} />
      <Modal
        title="Edit Contact"
        // acceptEnabled={state.formIsValid}
        onCancelModal={() => props.onCancelModal(props.mode)}
        onAcceptModal={handleSubmit}
        // isLoading={props.loading}
      >
        <form>
          {/* trying to figure out hidden input w/ photo */}
          <div className="input-field">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              name="website"
              id="website"
              value={values.website || ''}
              onChange={handleChange}
            />
          </div>
          <div>Phone</div>
          <div
            id="phone-container"
            className="input-field input-field__container"
          >
            <div className="input-field__phone">
              <input
                type="text"
                name="phone"
                id="phone"
                value={values.phone || ''}
                onChange={handleChange}
              />
            </div>
            <div className="input-field__phone-type">
              <select name="phoneType" id="phoneType">
                <option value="home">Home</option>
                <option value="cell">Cell</option>
                <option value="work">Work</option>
              </select>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="address">Address</label>
            <textarea
              onChange={handleChange}
              value={values.address || ''}
              name="address"
              id="address"
              rows="4"
            ></textarea>
          </div>
          <div className="input-field__container">
            <div className="input-field">
              <label htmlFor="birthday">Birthday</label>
              <input type="date" name="month" id="month" />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditContactForm;
