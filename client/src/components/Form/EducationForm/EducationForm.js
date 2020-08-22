import React from 'react';
import { useForm, validate } from '../../../hooks';

const EducationForm = ({ createProfile }) => {
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
      <div className="education">
        <h3>Education</h3>
        <div className="input-field">
          <label htmlFor="school">School</label>
          <input
            type="text"
            name="school"
            id="school"
            value={values.school || ''}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="degree">Degree</label>
          <input
            type="text"
            name="degree"
            id="degree"
            value={values.degree || ''}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="fieldOfStudy">Field Of Study</label>
          <input
            type="text"
            name="fieldOfStudy"
            id="fieldOfStudy"
            value={values.fieldOfStudy || ''}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="school-from">From</label>
          <input
            type="date"
            name="schoolFrom"
            id="schoolFrom"
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="school-to">To</label>
          <input
            type="date"
            name="schoolTo"
            id="schoolTo"
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

export default EducationForm;
