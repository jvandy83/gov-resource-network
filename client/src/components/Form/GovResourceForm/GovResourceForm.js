import React from 'react';
import { useForm, validate } from '../../../hooks';

const GovResourceForm = ({ createProfile }) => {
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
      <h3>Gov Resource Network Profile</h3>
      <div className="input-field">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={values.firstName || ''}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={values.lastName || ''}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label>Address</label>
        <input
          type="text"
          name="street"
          id="street"
          value={values.street || ''}
          onChange={handleChange}
          placeholder="Street Address"
        />
        <input
          type="text"
          name="city"
          id="city"
          value={values.city || ''}
          onChange={handleChange}
          placeholder="City"
        />
        <select name="state" id="stateId">
          <option value="">Select State</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
        <select name="country" id="countryId">
          <option value="">Select Country</option>
          <option value="US">United States</option>
        </select>
      </div>
      <div className="input-field">
        <label htmlFor="email">Email</label>
        <input
          className={`input ${errors.email && 'danger'}`}
          type="email"
          name="email"
          id="email"
          value={values.email || ''}
          onChange={(e) => handleChange(e)}
        />
        {errors.email && <p className="help">{errors.email}</p>}
      </div>
      <div className="input-field">
        <label htmlFor="jobTitle">Job Title</label>
        <input
          type="text"
          name="jobTitle"
          id="jobTitle"
          value={values.jobTitle || ''}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="industry">Industry</label>
        <input
          type="text"
          name="industry"
          id="industry"
          value={values.industry || ''}
          onChange={handleChange}
        />
      </div>
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
      <div className="input-field">
        <label htmlFor="bio">Bio</label>
        <textarea
          name="bio"
          id="bio"
          rows="4"
          value={values.bio || ''}
          onChange={handleChange}
        />
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

export default GovResourceForm;
