import React, { useState, useEffect } from 'react';
import './Jobs.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import useStateNames from '../../util/useStateNames';

import axios from 'axios';

const API_KEY_DEV = process.env.REACT_APP_BETA_SAM_GOV_API_KEY__DEV;

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

  // bringing in U.S. state names for input list
  const { stateValues } = useStateNames();

  const [values, setValues] = useState({});

  const [contractData, setContractData] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isRemovingInputValue, setIsRemovingInputValue] = useState(false);

  const toggleDropdown = (val) => {
    setDropdown((prev) => ({
      ...prev,
      [val]: !prev[val]
    }));
  };

  const checkValue = (str, max) => {
    if (str.charAt(0) !== '0' || str === '00') {
      var num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      str =
        num > parseInt(max.toString().charAt(0)) && num.toString().length === 1
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
        return v.length === 2 && i < 2 ? v + '/' : v;
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
    if (
      !e.target.classList.contains('jobs-input__form') &&
      !e.target.classList.contains('custom-select__option') &&
      !e.target.classList.contains('selected-options') &&
      !e.target.classList.contains('expand-icon__open') &&
      !e.target.classList.contains('dropdown-input')
    ) {
      for (let value in dropdown) {
        setDropdown(!dropdown[value]);
      }
    }
  };

  const handleOptionClick = (e) => {
    e && e.persist();
    setValues((prev) => ({
      ...prev,
      [e.target.id]: e.target.getAttribute('data-name')
    }));
  };

  const buildSearchUrl = (isRemoving) => {
    const colors = [
      '#a9d0ff',
      '#f7e29f',
      '#ffa8c4',
      '#bff9e4',
      '#f9a99e',
      '#ffe6a6',
      '#a4bdce',
      '#ffab90',
      '#d3dae2',
      '#e1f6cf',
      '#ffe4cd',
      '#f6d0d1',
      '#d8717a',
      '#b4b9e2'
    ];

    if (isRemoving) {
      return Object.entries(values).map((item, idx) => (
        <span key={item[1]} style={{ background: colors[idx] }}>
          {item[0]}={item[1]}
        </span>
      ));
    }

    let updatedEntries = {};

    for (let val in values) {
      if (!updatedEntries[val]) {
        updatedEntries[val] = values[val];
      }
    }
    const newArray = Object.entries(updatedEntries);
    return newArray.map((item, idx) => (
      <span
        key={item[1]}
        style={{
          background: colors[idx],
          padding: '.3rem',
          borderRadius: '.5rem',
          marginRight: '.5rem'
        }}
      >
        {item[0]}={item[1]}
      </span>
    ));
  };

  const removeInputValue = (val) => {
    delete values[val];
    setIsRemovingInputValue(true);
  };

  useEffect(() => {
    Object.values(values).length && setIsSubmitting(true);
    return () => {
      setIsRemovingInputValue(false);
    };
  }, [isSubmitting, values]);

  const fetchContracts = async () => {
    // group entries to easily
    // join them for query string
    const searchArray = Object.entries(values);
    // get array length to know where
    // to truncate '&' in query string
    const len = searchArray.length;
    // create string to concat all url values
    let searchString = '';

    searchArray.forEach((entry, idx, arr) => {
      if (idx < len - 1) {
        searchString += entry.join('=') + '&';
      } else {
        searchString += entry.join('=');
      }
    });

    const baseProdLikeUrl =
      'https://api-alpha.sam.gov/prodlike/opportunities/v1';

    // const baseProdUrl = 'https://api.sam.gov/prod/opportunities/v1/';

    try {
      const res = await axios.get(
        `${baseProdLikeUrl}/search?limit=10&api_key=${API_KEY_DEV}&${searchString}`
      );
      if (res.status !== 200 && res.status !== 201) {
        console.log('There was an error');
      }
      setContractData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDescriptions = () => {
    const { opportunitiesData } = contractData;
    const descPromise = opportunitiesData.map(async (op) => {
      await axios.get(`${op.description}&api_key=${API_KEY_DEV}`);
    });
    console.log(Promise.all(descPromise));
  };

  const buildContractList = () => {
    const descriptions = fetchDescriptions();
    const { opportunitiesData } = contractData;
    opportunitiesData.map((op, idx) => (
      <ul key={op.title} className="bids-display__list">
        <li className="bids-display__item title">{op.title}</li>
        <li className="bids-display__item active">{op.active}</li>
        <li className="bids-display__item description">{descriptions[idx]}</li>
      </ul>
    ));
  };

  return (
    <div onClick={(e) => handleClickOutside(e, dropdown)} className="jobs-root">
      <h1 className="jobs-header__title">Search for your contracts</h1>
      <div className="jobs-search__bar-container">
        <div className="jobs-search__entries">
          {isSubmitting && buildSearchUrl(isRemovingInputValue)}
        </div>
        <button onClick={() => fetchContracts()} className="search-button">
          Search
        </button>
      </div>
      <div>
        <span>Select entries from dropdown menu below</span>
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
              <div className="jobs-input__action-buttons">
                <button className="jobs-input__action-button action-confirm">
                  Confirm
                </button>
                <button
                  onClick={() => removeInputValue('postedFrom')}
                  className="jobs-input__action-button action-remove"
                >
                  Remove
                </button>
              </div>
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
              <div className="jobs-input__action-buttons">
                <button className="jobs-input__action-button action-confirm">
                  Confirm
                </button>
                <button
                  onClick={() => removeInputValue('postedTo')}
                  className="jobs-input__action-button action-remove"
                >
                  Remove
                </button>
              </div>
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
            <>
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
              <div className="jobs-input__action-buttons">
                <button className="jobs-input__action-button action-confirm">
                  Confirm
                </button>
                <button
                  onClick={() => removeInputValue('state')}
                  className="jobs-input__action-button action-remove"
                >
                  Remove
                </button>
              </div>
            </>
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
              <div className="jobs-input__action-buttons">
                <button className="jobs-input__action-button action-confirm">
                  Confirm
                </button>
                <button
                  onClick={() => removeInputValue('zip')}
                  className="jobs-input__action-button action-remove"
                >
                  Remove
                </button>
              </div>
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
          <div>
            <ul className="bids-display__list">
              <li className="bids-display__item title">Contract Title</li>
              <li className="bids-display__item active">Active</li>
              <li className="bids-display__item description">Description</li>
            </ul>
          </div>
          {/* list of opportunities here */}
          {/* {Object.keys(contractData).length && (
            <div className="bids-display__list"></div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
