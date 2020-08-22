import React from 'react';
import { useForm, validate } from '../../../hooks';

const SocialNetworkForm = ({ createProfile }) => {
  const { errors, values, handleChange, handleSubmit, clearInput } = useForm(
    createProfile,
    validate
  );
  const handleClearInput = (e) => {
    e && e.preventDefault();
    clearInput();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="social">
        <h3>Social Networks</h3>
        <div className="input-field">
          <label htmlFor="linkedIn">LinkedIn</label>
          <input
            type="text"
            name="linkedIn"
            id="linkedIn"
            value={values.linkedIn || ''}
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
      </div>
      <div className="submit-buttons">
        <button>Save</button>
        <button className="clear-button" onClick={handleClearInput}>
          Clear
        </button>
      </div>
    </form>
  );
};

export default SocialNetworkForm;
