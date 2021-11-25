import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useLocation } from 'react-router-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import modal from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modals');

const Modal = ({ children, onModalClose, type }) => {
  const history = useHistory();
  const location = useLocation();
  const modalHeightValue = type === 'order' ? '90%' : '70%';

  const customModalClose = useCallback(() => {
    onModalClose();
    if (location.state?.fromSite) history.replace('/');
  }, [location, history]);

  const closeByEscape = e => {
    if (e.code === 'Escape') {
      if (type === 'order') onModalClose();
      else customModalClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onModalClose={type === 'order' ? onModalClose : customModalClose}>
      <div className={modal.modal} style={{ height: `${modalHeightValue}` }}>
        <div className={modal.closeIcon} onClick={type === 'order' ? onModalClose : customModalClose}>
          <CloseIcon type='primary' />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
