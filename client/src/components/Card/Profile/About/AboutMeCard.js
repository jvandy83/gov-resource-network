import React, { useState, useEffect } from 'react';
import EditIcon from '@material-ui/icons/Edit';

import axios from 'axios';

const AboutMeCard = ({ user, toggleForm }) => {
  const [aboutMe, setAboutMe] = useState({});

  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/profile/${user && user.sub}`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          console.log('Could not fetch profile');
        } else {
          setAboutMe((prev) => ({
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

  return (
    <div className="card-item__container">
      <div className="card-item">
        <div className="card-item__header">
          <h3 className="card-item__title">About</h3>
          <div className="access-form__button">
            <button
              className="edit-button"
              onClick={() => toggleForm('showAboutMeForm')}
            >
              <EditIcon id="edit-icon" />
            </button>
          </div>
        </div>
        <div className="card-item-content__container">
          <div className="card-item__content">
            <p>{aboutMe.aboutMe}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMeCard;
