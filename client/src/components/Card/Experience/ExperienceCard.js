import React, { useEffect, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';

import '../Card.css';

import { Loading } from '../../../components';

import axios from 'axios';

const ExperienceCard = (props) => {
  const [expData, setExpData] = useState({});

  const [showExp, setShowExp] = useState(false);

  const { user } = props;

  useEffect(() => {
    axios.get(`http://localhost:5000/api/experience/${user}`).then((res) => {
      if (res.status !== 200) {
        const err = new Error(
          'An error occured while trying to fetch experience info for user profile.'
        );
        props.catchError(err);
      } else {
        setExpData((prev) => ({
          ...prev,
          exp: res.data
        }));
        setShowExp(true);
      }
    });
  }, [user]);

  if (!showExp) {
    return <Loading />;
  }

  const createExpProfile = () => {
    const { experience } = expData.exp.card;

    return experience
      ? experience.map((e) => {
          const from = new Date(e.prevFrom);
          const to = new Date(e.prevTo);
          return (
            // replace Math.random() with a
            // key created by map function
            <div key={Math.random()}>
              <div className="card__element">{e.prevTitle}</div>
              <div className="card__element">{e.prevCompany}</div>
              <div className="card__element">
                {from.toLocaleDateString()} - {to.toLocaleDateString()}
              </div>
            </div>
          );
        })
      : null;
  };

  return (
    <div className="card-item__container">
      <div>
        <h3 className="card-item__title">{props.title}</h3>
        {/* {createExpProfile()} */}
      </div>
      <div>
        <EditIcon
          id="edit-icon"
          onClick={() => props.onEditHandler('editExp')}
        />
      </div>
    </div>
  );
};

export default ExperienceCard;
