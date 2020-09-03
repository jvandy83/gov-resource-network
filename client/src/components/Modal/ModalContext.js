import React, { createContext } from 'react';
import useModal from '../../hooks/useModal';
import Modal from './Modal';

let ModalContext;
let { Provider } = (ModalContext = createContext());

const ModalProvider = ({ children }) => {
  const { modal, handleModal, modalContent } = useModal();
  return (
    <Provider value={{ modal, handleModal, modalContent }}>
      <Modal />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };
