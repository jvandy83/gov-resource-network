import React, { useEffect, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';

import '../Card.css';

import { Loading } from '../../../components';

import { useAuth0 } from '@auth0/auth0-react';

import axios from 'axios';

export default (props) => {
  const { user } = useAuth0();

  const [eduData, setEduData] = useState({});
  const [showEdu, setShowEdu] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/education/${user.sub}`).then((res) => {
      if (res.status !== 200) {
        const err = `An error occurred while trying to fetch education data`;
        props.useState((prev) => ({
          ...prev,
          error: err
        }));
      }
      setEduData((prev) => ({
        ...prev,
        edu: res.data
      }));
      setShowEdu(true);
    });
  }, []);

  if (!showEdu) {
    return <Loading />;
  }

  console.log(eduData);

  const createEduProfile = () => {
    const edu = eduData.edu.card.education;
    return edu.map((e) => {
      const from = new Date(e.schoolFrom);
      const to = new Date(e.schoolTo);
      return (
        <div key={e.school}>
          <div className="card__element">{e.school}</div>
          <div className="card__element">{e.degree}</div>
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
        {createEduProfile()}
      </div>
      <div>
        <EditIcon
          id="edit-icon"
          onClick={() => props.onEditHandler('editEdu')}
        />
      </div>
    </div>
  );
};
