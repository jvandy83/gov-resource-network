import React, { useEffect, useState } from 'react';

import EditIcon from '@material-ui/icons/Edit';

import axios from 'axios';

const AboutMe = (props) => {
  const { card } = props.profileData.profile;
  return (
    <div className="card-item__container">
      <div>
        <h3 className="card-item__title">{props.title}</h3>
        <div>{card && card.aboutMe}</div>
      </div>
      <div>
        <EditIcon
          id="edit-icon"
          onClick={() => props.onEditHandler('editAboutMe')}
        />
      </div>
    </div>
  );
};

export default AboutMe;
