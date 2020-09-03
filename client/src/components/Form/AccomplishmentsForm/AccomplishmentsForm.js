import React from 'react';
import { useForm, validate } from '../../../hooks';
import axios from 'axios';

const AccomplishmentsForm = ({ user, createProfile }) => {
  const createAccomplishments = (values) => {
    axios
      .put('http://localhost:5000/api/accomplishments', {
        data: { ...values, auth_0_user: user.sub },
        headers: { 'Content-Type': 'application/json' }
      })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed to create new accomplishments');
        }
      })
      .then((res) => {
        console.log('Created or updated new accomplishments');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { errors, values, handleChange, handleSubmit, clearInput } = useForm(
    createAccomplishments,
    validate
  );

  const handleClearInput = (e) => {
    e && e.preventDefault();
    clearInput(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-field">
        <label htmlFor="publications">Publications</label>
        <input
          type="text"
          name="publications"
          id="publications"
          value={values.publications || ''}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="patents">Patents</label>
        <input
          type="text"
          name="patents"
          id="patents"
          value={values.patents || ''}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="projects">Projects</label>
        <input
          type="text"
          name="projects"
          id="projects"
          value={values.projects || ''}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="courses">Courses</label>
        <input
          type="text"
          name="courses"
          id="courses"
          value={values.courses || ''}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="organizations">Organizations</label>
        <input
          type="text"
          name="organizations"
          id="organizations"
          value={values.organizations || ''}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="languages">Languages</label>
        <input
          type="text"
          name="languages"
          id="languages"
          value={values.languages || ''}
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

export default AccomplishmentsForm;
