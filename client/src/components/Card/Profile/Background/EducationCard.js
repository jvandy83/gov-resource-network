import React, { useState, useEffect } from 'react';

import './EducationCard.css';
import EditIcon from '@material-ui/icons/Edit';

import axios from 'axios';

const EducationCard = ({ user, toggleForm }) => {
  const [eduData, setEduData] = useState({});

  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/education/${user && user.sub}`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          console.log('Could not fetch profile');
        } else {
          setEduData((prev) => ({
            ...prev,
            ...response.data.edu
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

  const createEduObject = () => {
    return eduData.education.map((edu) => {
      const fromDate = new Date(edu.schoolFrom);
      const toDate = new Date(edu.schoolTo);
      return (
        <ul className="card-item__content-list" key={edu._id}>
          <h4 className="card-item__content-list--title">{edu.school}</h4>
          <li className="card-item__content-list--item">
            {edu.degree} {edu.fieldOfStudy}
          </li>
          <li className="card-item__content-list--item">
            {fromDate.toLocaleDateString().split('/')[2]} -{' '}
            {toDate.toLocaleDateString().split('/')[2]}
          </li>
        </ul>
      );
    });
  };

  return (
    <div className="card-item__container">
      <div className="card-item">
        <div className="card-item__header">
          <h3 className="card-item__title">Education</h3>
          <div className="access-form__button">
            <button
              className="edit-button"
              onClick={() => toggleForm('showEduForm')}
            >
              <EditIcon id="edit-icon" />
            </button>
          </div>
        </div>
        <div className="card-item-content__container">
          <div className="card-item__content">{createEduObject()}</div>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
