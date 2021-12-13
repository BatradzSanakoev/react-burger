import React, { ReactNode } from 'react';
import modalOverlay from './ModalOverlay.module.css';

type TModalOverlayProps = {
  children: ReactNode;
  onModalClose: () => void;
};

const ModalOverlay = ({ children, onModalClose }: TModalOverlayProps) => {
  return (
    <div className={modalOverlay.overlay} onClick={e => e.target === e.currentTarget && onModalClose()}>
      {children}
    </div>
  );
};

export default ModalOverlay;
