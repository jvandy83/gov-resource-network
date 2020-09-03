import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { ModalContext } from './ModalContext';

import EditIntroForm from '../Form/IntroFrom/EditIntroForm';

import './Modal.css';

const Modal = ({ children }) => {
  const { modal, modalContent, handleModal } = useContext(ModalContext);

  if (modal) {
    return ReactDOM.createPortal(
      <div className="modal">
        {/* <header className="modal-header">
          <h3>Modal</h3>
        </header> */}
        <div className="modal-content">
          <EditIntroForm />
        </div>
        <div className="modal-actions">
          {/* <button className="danger" onClick={() => handleModal}>
            Cancel
          </button> */}
          <button onClick={() => handleModal()}>&times;</button>
        </div>
      </div>,
      document.querySelector('#modal-root')
    );
  } else return null;
};

export default Modal;
