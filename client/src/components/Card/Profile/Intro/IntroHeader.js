import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { AddProfileDropdown } from '../../../index';
import { Link } from 'react-router-dom';

// styles
import '../../Card.css';
import EditIcon from '@material-ui/icons/Edit';

const IntroHeader = ({
  user,
  toggleForm,
  showCardContent,
  setShowCardContent
}) => {
  const [introData, setIntroData] = useState({});

  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/profile/${user && user.sub}`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          console.log('Could not fetch profile');
        } else {
          setIntroData((prev) => ({
            ...prev,
            ...response.data.profile
          }));
          setShowInfo(true);
        }
        return () => {
          setShowInfo(false);
        };
      })
      .catch((err) => console.log(err.message));
  }, []);

  if (!showInfo) {
    return <div>Loading...</div>;
  }

  const { intro } = introData;

  console.log(introData);

  return (
    <div className="card-item__container">
      <div className="card-item">
        <div className="card-item__header">
          <div>
            <div className="card-item__title">
              <h3 className="card-item__intro-name">
                {intro.firstName} {intro.lastName}
              </h3>
              <ul className="card-items__intro-list--items">
                <li className="card-item__intro-list--item job-title">
                  {intro.currentPosition}
                </li>
                <li className="card-item__intro-list--item location">
                  {intro.location.city}, {intro.location.state},{' '}
                  {intro.location.country}
                </li>
                <li className="card-item__intro-list--item">
                  <Link to="#">
                    <span className="card-item__intro-profile--link">
                      Contact
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="access-form__buttons">
            <div className="access-form__button edit">
              <button
                className="edit-button"
                onClick={() => toggleForm('showIntroForm')}
              >
                <EditIcon id="edit-icon" />
              </button>
            </div>
          </div>
        </div>
        <div className="card-item__content-container">
          <div className="card-item__content">
            <p className="card-item__content-job--title">{''}</p>
            <p className="card-item__content-location">{''}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroHeader;
