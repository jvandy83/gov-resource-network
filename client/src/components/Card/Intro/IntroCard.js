import React, { useEffect, useState } from 'react';

import Loading from '../../Loading/Loading';

import ContactCard from '../Contact/ContactCard';

import Button from '../../Button/Button';

import EditIcon from '@material-ui/icons/Edit';

import EditContactForm from '../../Form/EditContactForm';

import '../Card.css';

import axios from 'axios';

const IntroCard = (props) => {
  const [showIntro, setShowIntro] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [appUser, setAppUser] = useState({});
  const [state, setState] = useState({});

  useEffect(() => {
    const id = props.user && props.user.sub;
    axios.get(`http://localhost:5000/api/auth/me/${id}`).then((res) => {
      if (res.status !== 200) {
        const error = `Unable to fetch user.`;
        console.error(error);
      } else {
        const { user } = res.data;
        setAppUser((prev) => ({
          ...prev,
          appUser: user
        }));
        setState((prev) => ({
          ...prev,
          showUser: true
        }));
      }
    });
  }, [props.user.sub]);

  useEffect(() => {
    const id = props.user && props.user.sub;
    axios.get(`http://localhost:5000/api/experience/${id}`).then((res) => {
      if (res.status !== 200) {
        const error = `Could not fetch experience for user.`;
        console.error(error);
      }
      setAppUser((prev) => ({
        ...prev.appUser,
        exp: res.data
      }));
      setState((prev) => ({
        ...prev,
        showExp: true
      }));
    });
  }, []);

  const { card } = props.profileData.profile;

  const renderLocation = () => {
    const { city, state, country } = card.intro.location;
    return <span>{`${city}, ${state}, ${country}`}</span>;
  };

  const renderTitle = () => {
    const { experience } = appUser.exp.card;
    return <div>{experience[0].prevTitle}</div>;
  };

  const renderCompany = () => {
    const { experience } = appUser.exp.card;
    return <div>{experience[0].prevCompany}</div>;
  };

  const renderName = () => {
    return (
      <div>
        {appUser.firstName} {appUser.lastName}
      </div>
    );
  };

  return state.showUser && state.showExp ? (
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
          <div className="card__element card-item__title">{renderName()}</div>
          <div className="card__element">{renderTitle()}</div>
          <div className="card__element">{renderCompany()}</div>
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
  ) : null;
};

export default IntroCard;
