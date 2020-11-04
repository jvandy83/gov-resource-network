import React from 'react';

import Modal from '../Modal/Modal';
import Backdrop from '../Backdrop/Backdrop';

import { useAuth0 } from '@auth0/auth0-react';

import './Form.css';

import { useForm, validate } from '../../hooks';

const IntroForm = (props) => {
  const { user } = useAuth0();

  const log = (values) => {
    console.log(values);
  };

  const { values, handleChange, handleSubmit, clearInput } = useForm(
    props.createProfile,
    validate
  );

  const handleClearInput = (e) => {
    !!e && e.preventDefault();
    clearInput();
  };

  return (
    <>
      <Backdrop onClick={() => props.onCancelModal(props.mode)} />
      <Modal
        title="Edit Intro"
        // acceptEnabled={state.formIsValid}
        onCancelModal={() => props.onCancelModal(props.mode)}
        onAcceptModal={handleSubmit}
        // isLoading={props.loading}
      >
        <form>
          {/* trying to figure out hidden input w/ photo */}
          <input
            type="hidden"
            name="photo"
            value={(values.photo = user.picture)}
          />
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
            <label htmlFor="headline">Headline</label>
            <textarea
              rows="4"
              name="headline"
              id="headline"
              value={values.headline || ''}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="currentPosition">Current Position</label>
            <input
              type="text"
              name="currentPosition"
              id="currentPosition"
              value={values.currentPosition || ''}
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
            <div>
              <label>Location</label>
            </div>
            <input
              type="text"
              name="city"
              id="city"
              value={values.city || ''}
              onChange={handleChange}
              placeholder="City"
            />
          </div>
          <div className="input-field">
            <select
              value={values.state || ''}
              onChange={handleChange}
              name="state"
              id="stateId"
            >
              <option value="">Select State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District</option>
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
              <option value="NH">New</option>
              <option value="NJ">New</option>
              <option value="NM">New</option>
              <option value="NY">New</option>
              <option value="NC">North</option>
              <option value="ND">North</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode</option>
              <option value="SC">South</option>
              <option value="SD">South</option>
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
            <select
              value={values.country || ''}
              onChange={handleChange}
              name="country"
              id="countryId"
            >
              <option value="">Select Country</option>
              <option defaultValue value="United States">
                United States
              </option>
            </select>
          </div>
          <div className="input-field">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              value={values.postalCode || ''}
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
        </form>
      </Modal>
    </>
  );
};

export default IntroForm;
