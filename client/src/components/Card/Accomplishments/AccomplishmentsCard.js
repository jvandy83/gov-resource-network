import React from 'react';
import EditIcon from '@material-ui/icons/Edit';

import axios from 'axios';

const AccomplishmentsCard = (props) => {
  return (
    <div className="card-item__container">
      <h3>{props.title}</h3>
      <div>
        <EditIcon
          id="edit-icon"
          onClick={() => props.onEditHandler('editAccomp')}
        />
      </div>
    </div>
  );
};

export default AccomplishmentsCard;
