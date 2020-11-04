import React, { useEffect, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';

import '../Card.css';

import { Loading } from '../../../components';

import { useAuth0 } from '@auth0/auth0-react';

import axios from 'axios';

export default (props) => {
  const { user } = useAuth0();

  const [expData, setExpData] = useState({});

  const [showExp, setShowExp] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/experience/${user.sub}`)
      .then((res) => {
        if (res.status !== 200) {
          const err = new Error(
            'An error occured while trying to fetch experience info for user profile.'
          );
          props.catchError(err);
        }
        setExpData((prev) => ({
          ...prev,
          exp: res.data
        }));
        setShowExp(true);
      });
  }, []);

  if (!showExp) {
    return <Loading />;
  }

  const createExpProfile = () => {
    const exp = expData.exp.card.experience;

    return exp.map((e) => {
      const from = new Date(e.prevFrom);
      const to = new Date(e.prevTo);
      return (
        <div key={e.prevCompany}>
          <div className="card__element">{e.prevTitle}</div>
          <div className="card__element">{e.prevCompany}</div>
          <div className="card__element">
            {from.toLocaleDateString()} - {to.toLocaleDateString()}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="card-item__container">
      <div>
        <h3 className="card-item__title">{props.title}</h3>
        {createExpProfile()}
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
