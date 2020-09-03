import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { useForm, validate } from '../../../hooks';

import './ContactForm.css';

const IntroForm = ({ createProfile, formState }) => {
  const { user } = useAuth0();
  const log = (values) => {
    console.log(values);
  };
  const { errors, values, handleChange, handleSubmit, clearInput } = useForm(
    createProfile,
    validate
  );

  const handleClearInput = (e) => {
    !!e && e.preventDefault();
    clearInput();
  };

  return (
    <form className="intro-form__edit" onSubmit={handleSubmit}>
      {/* trying to figure out hidden input w/ photo */}
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
      <div>Phone</div>
      <div id="phone-container" className="input-field input-field__container">
        <div className="input-field__phone">
          <input
            type="text"
            name="phone"
            id="phone"
            value={values.phone || ''}
            onChange={handleChange}
          />
        </div>
        <div className="input-field__phone-type">
          <select name="phoneType" id="phoneType">
            <option value="home">Home</option>
            <option value="cell">Cell</option>
            <option value="work">Work</option>
          </select>
        </div>
      </div>
      <div className="input-field">
        <label htmlFor="address">Address</label>
        <textarea
          onChange={handleChange}
          value={values.address || ''}
          name="address"
          id="address"
          rows="4"
        ></textarea>
      </div>
      <div className="input-field__container">
        <div className="input-field">
          <label htmlFor="birthday">Birthday</label>
          <input type="date" name="month" id="month" />
        </div>
        <div className="input-field">
          <div>
            <label htmlFor="day">Day</label>
          </div>
          <select name="day" id="day">
            <option value=""></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
          </select>
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

export default IntroForm;
