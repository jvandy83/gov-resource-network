import React from 'react';

import Backdrop from '../../Backdrop/Backdrop';

import Modal from '../../Modal/Modal';

import EditIcon from '@material-ui/icons/Edit';

import { Link } from 'react-router-dom';

import './ContactCard.css';

const ContactCard = (props) => {
  return (
    <>
      <Backdrop onClick={() => props.onCancelModal(props.mode)} />
      <Modal
        title="Jared Vandeventer"
        type="contact"
        // acceptEnabled={state.formIsValid}
        onCancelModal={() => props.onCancelModal(props.mode)}
        // onAcceptModal={handleSubmit}
        // isLoading={props.loading}
      >
        <div className="main-section">
          <div className="main-section__title">
            <h3>Contact Info</h3>
            <EditIcon
              onClick={() => props.onEditHandler(props.mode)}
              id="contact-card__edit-icon"
              className="edit-icon__card"
            />
          </div>
          <ul className="main-section__list">
            <li className="main-section__list-item">
              <div>
                <h4 className="list-item__title">Your Profile</h4>
                <Link className="list-item__link" to="#">
                  http://govLink/vanthedev.com
                </Link>
              </div>
            </li>
            <li className="main-section__list-item">
              <div>
                <h4 className="list-item__title">Website</h4>
                <Link className="list-item__link" to="#">
                  http://vanthedev.com
                </Link>
              </div>
            </li>
            <li className="main-section__list-item">
              <div>
                <h4 className="list-item__title">Phone</h4>
                <span>720-470-7493</span>
              </div>
            </li>
            <li className="main-section__list-item">
              <div>
                <h4 className="list-item__title">Address</h4>
                <div>
                  <span>4783 Dorchester Cir</span>
                  <br />
                  <span>Boulder CO, 80304</span>
                </div>
              </div>
            </li>
            <li className="main-section__list-item">
              <div>
                <h4 className="list-item__title">Email</h4>
                <a
                  className="list-item__link"
                  href="mailto:vanthedev@gmail.com"
                >
                  vanthedev@gmail.com
                </a>
              </div>
            </li>
            <li
              className="main-section__list-item"
              style={{ paddingBottom: '2rem' }}
            >
              <div>
                <h4 className="list-item__title">Birthday</h4>
                <span>April 7</span>
              </div>
            </li>
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default ContactCard;
