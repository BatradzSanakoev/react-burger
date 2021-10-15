import React from 'react';
import modalOverlay from './ModalOverlay.module.css'

const ModalOverlay = ({ children }) => {
    return (
        <div className={modalOverlay.overlay}>
            {children}
        </div>
    )
};

export default ModalOverlay;