import React, { useEffect, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

const ExperienceCard = ({ user, toggleForm }) => {
  const [expData, setExpData] = useState({});

  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/experience/${user && user.sub}`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          console.log('Could not fetch profile');
        } else {
          setExpData(response.data.exp);
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

  console.log(expData);

  const createExpObject = () => {
    return expData.experience.map((e) => {
      const fromDate = new Date(e.prevFrom).toLocaleDateString().split('/')[2];
      const toDate = new Date(e.prevTo).toLocaleDateString().split('/')[2];
      console.log(fromDate);
      console.log(toDate);
      const duration = toDate - fromDate;
      return (
        // current job
        // job title
        // from - to date (duration of employment)
        // job description
        <ul className="card-item__content-list" key={e._id}>
          <h4 className="card-item__content-list--title">{e.prevCompany}</h4>
          <li className="card-item__content-list--item">{e.prevTitle}</li>
          <li className="card-item__content-list--item">
            {fromDate} - {toDate}
          </li>
        </ul>
      );
    });
  };

  return (
    <div className="card-item__container">
      <div className="card-item">
        <div className="card-item__header">
          <h3 className="card-item__title">Experience</h3>
          <div className="access-form__button">
            <button
              className="edit-button"
              onClick={() => toggleForm('showExperienceForm')}
            >
              <EditIcon id="edit-icon" />
            </button>
          </div>
        </div>
        <div className="card-item-content__container">
          <div className="card-item__content">{createExpObject()}</div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
