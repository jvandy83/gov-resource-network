import React, { useEffect, useState } from 'react';

import EditIntroForm from '../Form/EditIntroForm';

// import { AddProfileDropdown } from '../../../index';
import { Link } from 'react-router-dom';

// styles
import './Card.css';
import { Card } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const ProfileCard = ({
  description,
  card,
  cardType,
  subItem,
  toggleForm,
  title
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const buildCard =
    card &&
    card.map((item) => {
      return (
        <ul
          key={item.school || item.prevTitle}
          className="card-items__list--items"
        >
          <h2 className="card-item__title">{title}</h2>
          <h3 className="card-item__list--item">
            {item.school || item.prevTitle}
          </h3>
          <li className="card-item__list--item">
            {item.degree || item.prevCompany}
          </li>
          <li className="card-item__list--item">
            {item.fieldOfStudy || item.prevDescription}
          </li>
          <li className="card-item__list--item">
            {new Date(item.schoolFrom || item.prevFrom).toLocaleDateString()} -{' '}
            {new Date(item.schoolTo || item.prevTo).toLocaleDateString()}
          </li>
        </ul>
      );
    });

  if (isEditing) {
    return (
      <EditIntroForm
        editing={isEditing}
        onCancelModal={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="card-item__container">
      <div className="card-item">
        <div>
          {card ? (
            <>{buildCard}</>
          ) : (
            <>
              <h2 className="card-item__title">{title}</h2>
              <ul className="card-items__list--items">
                <li className="card-item__list--item">{description}</li>
                <li className="card-item__list--item">{subItem}</li>
                <li className="card-item__list--item">
                  <Link to="#">
                    <span className="card-item__profile--link">
                      {/* {listItems[2]} */}
                    </span>
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
        <div className="card-item__content-container">
          <div className="card-item__content">
            <p className="card-item__content-job--title">
              {/* props.content */}
              {''}
            </p>
            <p className="card-item__content-location">{''}</p>
          </div>
        </div>
      </div>
      <div className="access-form__button edit">
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          <EditIcon id="edit-icon" />
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
