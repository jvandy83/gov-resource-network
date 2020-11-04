import React from 'react';

import Modal from '../Modal/Modal';

import Backdrop from '../Backdrop/Backdrop';

import './Form.css';

import { useForm, validate } from '../../hooks';

const SocialNetworkForm = (props) => {
  const { values, handleChange, handleSubmit, clearInput } = useForm(
    props.createProfile,
    validate
  );
  const handleClearInput = (e) => {
    e && e.preventDefault();
    clearInput();
  };
  return (
    <>
      <Backdrop onClick={() => props.onCancelModal(props.mode)} />
      <Modal
        title="Edit Social Network"
        // acceptEnabled={state.formIsValid}
        onCancelModal={() => props.onCancelModal(props.mode)}
        onAcceptModal={handleSubmit}
        // isLoading={props.loading}
      >
        <form>
          <div className="input-field">
            <label htmlFor="linkedin">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              id="linkedin"
              value={values.linkedin || ''}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="twitter">Twitter</label>
            <input
              type="text"
              name="twitter"
              id="twitter"
              value={values.twitter || ''}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="instagram">Instagram</label>
            <input
              type="text"
              name="instagram"
              id="instagram"
              value={values.instagram || ''}
              onChange={handleChange}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default SocialNetworkForm;
