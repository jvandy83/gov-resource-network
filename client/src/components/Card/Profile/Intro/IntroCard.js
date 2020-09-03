import React, { useEffect, useState } from 'react';

// import { AddProfileDropdown } from '../../../index';
import { Link } from 'react-router-dom';

import axios from 'axios';

// styles
import '../../Card.css';
import EditIcon from '@material-ui/icons/Edit';

const IntroCard = ({
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

  return (
    <div className="card-item__container" id="intro-header">
      <div className="card-item">
        <div className="card-item__header">
          <div>
            <h2 className="card-item__title">
              {intro.firstName} {intro.lastName}
            </h2>
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

export default IntroCard;
