import React, { useEffect, useState } from 'react';

import Loading from '../../Loading/Loading';

import ContactCard from '../Contact/ContactCard';

import Button from '../../Button/Button';

import EditIcon from '@material-ui/icons/Edit';

// styles
import '../Card.css';
import EditContactForm from '../../Form/EditContactForm';

export default (props) => {
  const [showIntro, setShowIntro] = useState(false);
  const [showContact, setShowContact] = useState(false);
  useEffect(() => {
    props.showCard && setShowIntro(true);
  }, []);

  const { card } = props.profileData.profile;

  const getLocation = () => {
    const { city, state, country } = card.intro.location;
    return <span>{`${city}, ${state}, ${country}`}</span>;
  };

  return (
    <div className="card-item__container">
      {showContact && (
        <ContactCard
          onEditHandler={props.onEditHandler}
          mode="editContact"
          onCancelModal={props.onCancelModal}
        />
      )}
      <div>
        <>
          <div className="card__element card-item__title">
            {card.intro.firstName} {card.intro.lastName}
          </div>
          <div className="card__element">{card.intro.currentPosition}</div>
          <div className="card__element">{getLocation()}</div>
        </>
        <div className="card__element">
          <Button onClick={() => setShowContact(true)}>Contact Info</Button>
        </div>
      </div>
      <div>
        <EditIcon
          id="edit-icon"
          onClick={() => props.onEditHandler(props.mode)}
        />
      </div>
    </div>
  );
};
