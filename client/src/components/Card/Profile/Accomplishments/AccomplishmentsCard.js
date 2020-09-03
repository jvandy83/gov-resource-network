import React from 'react';
import EditIcon from '@material-ui/icons/Edit';

const AccomplishmentsCard = ({ user, toggleForm }) => {
  return (
    <div className="card-item__container">
      <div className="card-item">
        <div className="card-item__header">
          <h3 className="card-item__title">Accomplishments</h3>
          <div className="access-form__button">
            <button
              className="edit-button"
              onClick={() => toggleForm('showAccompForm')}
            >
              <EditIcon id="edit-icon" />
            </button>
          </div>
        </div>
        <div className="card-item-content__container">
          <p className="card-item__content">{}</p>
        </div>
      </div>
    </div>
  );
};

export default AccomplishmentsCard;
