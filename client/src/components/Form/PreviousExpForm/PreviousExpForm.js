import React from 'react';
import { useForm, validate } from '../../../hooks';

const PreviousExpForm = ({ createProfile }) => {
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
      <div className="work-history">
        <h3>Previous Experience</h3>
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="previousTitle"
            id="previousTitle"
            value={values.previousTitle || ''}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            name="company"
            id="company"
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="from">From</label>
          <input
            type="date"
            name="previousJobFrom"
            id="previousJobFrom"
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="to">To</label>
          <input
            type="date"
            name="previousJobTo"
            id="previousJobTo"
            onChange={handleChange}
          />
        </div>
        <div className="input-field__checkbox">
          <label htmlFor="current-job">
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
          <label htmlFor="previousJobDescription">Job Description</label>
          <textarea
            name="previousJobDescription"
            id="previousJobDescription"
            rows="4"
            value={values.previousJobDescription || ''}
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

export default PreviousExpForm;
