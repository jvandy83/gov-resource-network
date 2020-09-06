import React from 'react';
import { useForm, validate } from '../../hooks';

import Modal from '../Modal/Modal';

import Backdrop from '../Backdrop/Backdrop';

const AboutForm = (props) => {
  const { values, handleChange, handleSubmit, clearInput } = useForm(
    props.createProfile,
    validate
  );

  const handleClearInput = (e) => {
    e && e.preventDefault();
    clearInput(values);
  };

  return (
    <>
      <Backdrop onClick={props.onCancelModal} />
      <Modal
        title="Edit About Me"
        // acceptEnabled={state.formIsValid}
        onCancelModal={props.onCancelModal}
        onAcceptModal={handleSubmit}
        // isLoading={props.loading}
      >
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label>About</label>
            <textarea
              type="textarea"
              rows="4"
              value={values.aboutMe || ''}
              name="aboutMe"
              onChange={handleChange}
            />
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

export default AboutForm;
