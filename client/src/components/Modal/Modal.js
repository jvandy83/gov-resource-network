import React from 'react';

import ModalButton from '../Button/Modal/ModalButton';

import './Modal.css';

const modal = (props) => {
  return (
    <div className="modal">
      <header className="modal-header">
        <h1>{props.title}</h1>
      </header>
      <div className="modal-content">{props.children}</div>
      <div className="modal-actions">
        <ModalButton design="danger" mode="flat" onClick={props.onCancelModal}>
          Cancel
        </ModalButton>
        <ModalButton
          // disabled={props.acceptEnabled}
          mode="raised"
          onClick={props.onAcceptModal}
          loading={props.isLoading}
        >
          Save
        </ModalButton>
      </div>
    </div>
  );
};

export default modal;
