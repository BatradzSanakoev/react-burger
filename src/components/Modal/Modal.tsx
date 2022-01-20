import React, { useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import modal from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TModalProps = {
  children: ReactNode;
  onModalClose: () => void;
};

const modalRoot: HTMLElement | null = document.getElementById('modals');

const Modal = ({ children, onModalClose }: TModalProps) => {

  const closeByEscape = (e: KeyboardEvent) => {
    e.code === 'Escape' && onModalClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onModalClose={onModalClose}>
      <div id='modal' className={modal.modal}>
        <div id='closeIcon' className={modal.closeIcon} onClick={onModalClose}>
          <CloseIcon type='primary' />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot!
  );
};

export default Modal;
