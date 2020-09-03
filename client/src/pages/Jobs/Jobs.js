import React, { useState } from 'react';
import './Jobs.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import useStateNames from '../../util/useStateNames';

const Jobs = () => {
  const INITIAL_DROPDOWN_STATE = {
    postedTo: false,
    postedFrom: false,
    ptype: false, // procurement date
    solnum: false, // solicitation number
    noticeid: false,
    state: false,
    title: false,
    deptname: false,
    subtier: false, // agency name
    zip: false,
    organizationCode: false,
    organizationName: false,
    typeOfSetAside: false,
    typeOfSetAsideDescription: false,
    ncode: false, // NAICS code
    ccode: false, // classification code
    rdlfrom: false,
    rdlto: false
  };
  const [dropdown, setDropdown] = useState(INITIAL_DROPDOWN_STATE);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [values, setValues] = useState({});

  const { stateValues } = useStateNames();

  const toggleDropdown = (val) => {
    setDropdown((prev) => ({
      ...prev,
      [val]: !prev[val]
    }));
  };

  const checkValue = (str, max) => {
    if (str.charAt(0) !== '0' || str == '00') {
      var num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      str =
        num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
          ? '0' + num
          : num.toString();
    }
    return str;
  };

  const handleChange = (e) => {
    e && e.persist();
    let { value } = e.target;
    if (e.target.id === 'date') {
      if (/\D\/$/.test(value)) {
        value = value.substr(0, value.length - 3);
      }
      var values = value.split('/').map(function (v) {
        return v.replace(/\D/g, '');
      });
      if (values[0]) values[0] = checkValue(values[0], 12);
      if (values[1]) values[1] = checkValue(values[1], 31);
      var output = values.map(function (v, i) {
        return v.length == 2 && i < 2 ? v + ' / ' : v;
      });
      value = output.join('').substr(0, 14);
    } else if (e.target.id === 'state') {
      setValues((prev) => ({
        ...prev,
        [e.target.state]: e.target.getAttribute('data-name')
      }));
    }
    setValues((prev) => ({
      ...prev,
      [e.target.name]: value
    }));
    setIsSubmitting(false);
  };

  const handleBlur = (e) => {
    e && e.persist();
    const { value } = e.target;
    var values = value.split('/').map(function (v, i) {
      return v.replace(/\D/g, '');
    });
    var output = '';

    if (values.length == 3) {
      var year =
        values[2].length !== 4
          ? parseInt(values[2]) + 2000
          : parseInt(values[2]);
      var month = parseInt(values[0]) - 1;
      var day = parseInt(values[1]);
      var d = new Date(year, month, day);
      if (!isNaN(d)) {
        var dates = [d.getMonth() + 1, d.getDate(), d.getFullYear()];
        output = dates
          .map(function (v) {
            v = v.toString();
            return v.length == 1 ? '0' + v : v;
          })
          .join(' / ');
      }
    }
    setValues((prev) => ({
      ...prev,
      [e.target.name]: output
    }));
  };

  const createStateOptions = () => {
    return stateValues.map((state) => (
      <li
        className="custom-select__option"
        id="state"
        onClick={handleOptionClick}
        key={state.value}
        data-name={state.value || ''}
      >
        {state.label}
      </li>
    ));
  };

  const handleClickOutside = (e, dropdown) => {
    const val = e.target;
    if (
      !e.target.classList.contains('jobs-input__form') &&
      !e.target.classList.contains('custom-select__option') &&
      !e.target.classList.contains('selected-options') &&
      !e.target.classList.contains('expand-icon__open') &&
      !e.target.classList.contains('dropdown-input')
    ) {
      setTimeout(() => {
        for (let value in dropdown) {
          setDropdown(!dropdown[value]);
        }
      }, 300);
    }
  };

  const handleOptionClick = (e) => {
    e && e.persist();
    setValues((prev) => ({
      ...prev,
      [e.target.id]: e.target.getAttribute('data-name')
    }));
    setIsSubmitting(true);
    setTimeout(() => {
      toggleDropdown('state');
    }, 500);
  };

  const buildSearchUrl = () => {
    const colors = [
      '#a9d0ff',
      '#f7e29f',
      '#ffa8c4',
      '#bff9e4',
      '#f9a99e',
      '#ffe6a6',
      '#a4bdce'
    ];
    const urlKeys = Object.entries(values);
    if (urlKeys.length) {
      return urlKeys.map((key, val) => {
        console.log('key: ', key, 'val: ', val);
        const randColor = colors[Math.floor(Math.random() * colors.length)];
        return (
          <span
            className="query-item"
            style={{ background: randColor }}
            key={key[1]}
          >
            {`${key[0]}=${key[1]}`}{' '}
          </span>
        );
      });
    }
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();
    setIsSubmitting(true);
  };

  return (
    <div onClick={(e) => handleClickOutside(e, dropdown)} className="jobs-root">
      <h2 className="jobs-header__title">Search for your contracts</h2>
      <div>
        {isSubmitting ? (
          <div>
            <div className="jobs-search__entries">
              <>{buildSearchUrl()}</>
            </div>
            <button className="search-button">Search</button>
          </div>
        ) : (
          <div>
            <div className="jobs-search__entries jobs-search__input-placeholder">
              Your selected values will be placed here...
            </div>
            <button className="search-button">Search</button>
          </div>
        )}
      </div>

      <div className="jobs-main__section">
        <div className="jobs-input__form">
          {dropdown.postedFrom ? (
            <div className="jobs-input__dropdown">
              <div className="jobs-input__dropdown-header">
                <p className="jobs-input__title">From Date</p>
                <button
                  onClick={() => toggleDropdown('postedFrom')}
                  className="jobs-input__dropdown-button"
                >
                  <ExpandLessIcon className="expand-icon expand-icon__close" />
                </button>
              </div>
              <input
                name="postedFrom"
                id="date"
                value={values.postedFrom || ''}
                onChange={handleChange}
                className="dropdown-input"
                type="text"
                placeholder="MM / dd / yyyy"
              />
              <button
                onClick={handleSubmit}
                className="jobs-input__select-button"
              >
                Select
              </button>
            </div>
          ) : (
            <div className="jobs-input">
              <p className="jobs-input__title">From Date</p>
              <button
                className="jobs-input__dropdown-button"
                onClick={() => toggleDropdown('postedFrom')}
              >
                <ExpandMoreIcon className="expand-icon expand-icon__open" />
              </button>
            </div>
          )}
          {dropdown.postedTo ? (
            <div className="jobs-input__dropdown">
              <div className="jobs-input__dropdown-header">
                <p className="jobs-input__title">To Date</p>
                <button
                  onClick={() => toggleDropdown('postedTo')}
                  className="jobs-input__dropdown-button"
                >
                  <ExpandLessIcon className="expand-icon expand-icon__close" />
                </button>
              </div>
              <input
                name="postedTo"
                id="date"
                value={values.postedTo || ''}
                onChange={handleChange}
                className="dropdown-input"
                type="text"
                placeholder="MM / dd / yyyy"
              />
              <button
                onClick={handleSubmit}
                className="jobs-input__select-button"
              >
                Select
              </button>
            </div>
          ) : (
            <div className="jobs-input">
              <p className="jobs-input__title">To Date</p>
              <button
                className="jobs-input__dropdown-button"
                onClick={() => toggleDropdown('postedTo')}
              >
                <ExpandMoreIcon className="expand-icon expand-icon__open" />
              </button>
            </div>
          )}
          {dropdown.state ? (
            <div className="jobs-input__dropdown">
              <div className="jobs-input__dropdown-header">
                <p className="jobs-input__title">State</p>
                <button
                  onClick={() => toggleDropdown('state')}
                  className="jobs-input__dropdown-button"
                >
                  <ExpandLessIcon className="expand-icon expand-icon__close" />
                </button>
              </div>
              <ul className="select-options">{createStateOptions()}</ul>
            </div>
          ) : (
            <div className="jobs-input">
              <p className="jobs-input__title">State</p>
              <button
                onClick={() => toggleDropdown('state')}
                className="jobs-input__dropdown-button"
              >
                <ExpandMoreIcon className="expand-icon expand-icon__open" />
              </button>
            </div>
          )}
          {dropdown.zip ? (
            <div className="jobs-input__dropdown">
              <div className="jobs-input__dropdown-header">
                <p className="jobs-input__title">Postal Code</p>
                <button
                  onClick={() => toggleDropdown('zip')}
                  className="jobs-input__dropdown-button"
                >
                  <ExpandLessIcon className="expand-icon expand-icon__close" />
                </button>
              </div>
              <input
                autoComplete="off"
                name="zip"
                id="zip"
                value={values.zip || ''}
                onChange={handleChange}
                className="dropdown-input"
                type="text"
              />
              <button
                onClick={handleSubmit}
                className="jobs-input__select-button"
              >
                Select
              </button>
            </div>
          ) : (
            <div className="jobs-input">
              <p className="jobs-input__title">Postal Code</p>
              <button
                onClick={() => toggleDropdown('zip')}
                className="jobs-input__dropdown-button"
              >
                <ExpandMoreIcon className="expand-icon expand-icon__open" />
              </button>
            </div>
          )}
          <div className="jobs-input">
            <p className="jobs-input__title">Department Name</p>
            <button
              onClick={() => toggleDropdown('deptName')}
              className="jobs-input__dropdown-button"
            >
              <ExpandMoreIcon className="expand-icon expand-icon__open" />
            </button>
          </div>
          <div className="jobs-input">
            <p className="jobs-input__title">Organization Code</p>
            <button
              onClick={() => toggleDropdown('organizationCode')}
              className="jobs-input__dropdown-button"
            >
              <ExpandMoreIcon className="expand-icon expand-icon__open" />
            </button>
          </div>
          <div className="jobs-input">
            <p className="jobs-input__title">Organization Name</p>
            <button
              onClick={() => toggleDropdown('organizationName')}
              className="jobs-input__dropdown-button"
            >
              <ExpandMoreIcon className="expand-icon expand-icon__open" />
            </button>
          </div>
          <div className="jobs-input">
            <p className="jobs-input__title">Procurement Type</p>
            <button className="jobs-input__dropdown-button">
              <ExpandMoreIcon className="expand-icon expand-icon__open" />
            </button>
          </div>
          {dropdown.title ? (
            <div className="jobs-input__dropdown">
              <div className="jobs-input__dropdown-header">
                <p className="jobs-input__title">Title</p>
                <button
                  onClick={() => toggleDropdown('title')}
                  className="jobs-input__dropdown-button"
                >
                  <ExpandLessIcon className="expand-icon expand-icon__close" />
                </button>
              </div>
              <input
                name="title"
                id="title"
                value={values.title || ''}
                onChange={handleChange}
                className="dropdown-input"
                type="text"
              />
            </div>
          ) : (
            <div className="jobs-input">
              <p className="jobs-input__title">Title</p>
              <button
                onClick={() => toggleDropdown('title')}
                className="jobs-input__dropdown-button"
              >
                <ExpandMoreIcon className="expand-icon expand-icon__open" />
              </button>
            </div>
          )}
          <div className="jobs-input">
            <p className="jobs-input__title">Solicitation Number</p>
            <button
              onClick={() => toggleDropdown('solnum')}
              className="jobs-input__dropdown-button"
            >
              <ExpandMoreIcon className="expand-icon expand-icon__open" />
            </button>
          </div>
          <div className="jobs-input">
            <p className="jobs-input__title">Response Deadline (from)</p>
            <button
              onClick={() => toggleDropdown('rdlfrom')}
              className="jobs-input__dropdown-button"
            >
              <ExpandMoreIcon className="expand-icon expand-icon__open" />
            </button>
          </div>
          <div className="jobs-input">
            <p className="jobs-input__title">Response Deadline (to)</p>
            <button
              onClick={() => toggleDropdown('rdlto')}
              className="jobs-input__dropdown-button"
            >
              <ExpandMoreIcon className="expand-icon expand-icon__open" />
            </button>
          </div>
          <div className="jobs-input">
            <p className="jobs-input__title">Notice ID</p>
            <button
              onClick={() => toggleDropdown('noticeid')}
              className="jobs-input__dropdown-button"
            >
              <ExpandMoreIcon className="expand-icon expand-icon__open" />
            </button>
          </div>
          <div className="jobs-input">
            <p className="jobs-input__title">Set-Aside</p>
            <button
              onClick={() => toggleDropdown('typeOfSetAside')}
              className="jobs-input__dropdown-button"
            >
              <ExpandMoreIcon className="expand-icon expand-icon__open" />
            </button>
          </div>
          <div className="jobs-input">
            <p className="jobs-input__title">Set-Aside Code</p>
            <button
              onClick={() => toggleDropdown('typeOfSetAsideDescription')}
              className="jobs-input__dropdown-button"
            >
              <ExpandMoreIcon className="expand-icon expand-icon__open" />
            </button>
          </div>
          <div className="jobs-input">
            <p className="jobs-input__title">NAICS Code</p>
            <button
              onClick={() => toggleDropdown('ncode')}
              className="jobs-input__dropdown-button"
            >
              <ExpandMoreIcon className="expand-icon expand-icon__open" />
            </button>
          </div>
          <div className="jobs-input">
            <p className="jobs-input__title">Classification Code</p>
            <button
              onClick={() => toggleDropdown('ccode')}
              className="jobs-input__dropdown-button"
            >
              <ExpandMoreIcon className="expand-icon expand-icon__open" />
            </button>
          </div>
        </div>
        <div className="bids-display__container">
          <h2 className="bids-display__header">Results</h2>
          <ul className="bids-display__item">
            <li className="bids-display__title bid">Contract Title</li>
            <li className="bids-display__isopen bid">Open/Close</li>
            <li className="bids-display__description bid">Description</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
