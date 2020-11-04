import React from 'react';
import { useForm, validate } from '../../hooks';

import Modal from '../Modal/Modal';

import Backdrop from '../Backdrop/Backdrop';

import './Form.css';

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
      <Backdrop onClick={() => props.onCancelModal(props.mode)} />
      <Modal
        title="Edit About"
        // acceptEnabled={state.formIsValid}
        onCancelModal={() => props.onCancelModal(props.mode)}
        onAcceptModal={handleSubmit}
        // isLoading={props.loading}
      >
        <form>
          <div className="input-field">
            <label>About</label>
            <textarea
              type="textarea"
              rows="8"
              value={values.aboutMe || ''}
              name="aboutMe"
              onChange={handleChange}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AboutForm;
