import React from 'react';
import { useForm, validate } from '../../../hooks';

const AboutForm = ({ createProfile }) => {
  const { errors, values, handleChange, handleSubmit, clearInput } = useForm(
    createProfile,
    validate
  );

  const handleClearInput = (e) => {
    e && e.preventDefault();
    clearInput(values);
  };

  return (
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
  );
};

export default AboutForm;
