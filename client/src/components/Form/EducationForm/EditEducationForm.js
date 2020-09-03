import React from 'react';
import { useForm, validate } from '../../../hooks';
import axios from 'axios';

const EducationForm = ({ user, createProfile }) => {
  const createEducation = (values) => {
    axios
      .put('http://localhost:5000/api/education', {
        data: { ...values, auth_0_user: user.sub },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Could not create education object');
        }
      })
      .then((res) => {
        console.log('Success, created or updated an education document');
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const { errors, values, handleChange, handleSubmit, clearInput } = useForm(
    createEducation,
    validate
  );

  const handleClearInput = (e) => {
    e && e.preventDefault();
    clearInput(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="education">
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
          <label htmlFor="schoolFrom">From</label>
          <input
            type="date"
            name="schoolFrom"
            id="schoolFrom"
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="schoolTo">To</label>
          <input
            type="date"
            name="schoolTo"
            id="schoolTo"
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
  );
};

export default EducationForm;