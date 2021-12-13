import React, { useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import modal from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TModalProps = {
  children: ReactNode;
  onModalClose: () => void;
  type: string | null;
};

const modalRoot: HTMLElement | null = document.getElementById('modals');

const Modal = ({ children, onModalClose, type }: TModalProps) => {
  const modalHeightValue = type === 'order' ? '90%' : '70%';

  const closeByEscape = (e: KeyboardEvent) => {
    e.code === 'Escape' && onModalClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onModalClose={onModalClose}>
      <div className={modal.modal} style={{ height: `${modalHeightValue}` }}>
        <div className={modal.closeIcon} onClick={onModalClose}>
          <CloseIcon type='primary' />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot!
  );
};

export default Modal;
