import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import modal from './Modal.module.css';
import closeIcon from '../../images/close-icon.png';

const modalRoot = document.getElementById('modals');

const Modal = ({ children, onModalClose, type }) => {
    const modalHeightValue = type === 'order' ? '90%' : '70%';
    
    React.useEffect(() => {
        document.addEventListener('keydown', e => e.code === 'Escape' && onModalClose());
        return () => document.removeEventListener('keydown', e => e.code === 'Escape' && onModalClose());
    }, []);

    return ReactDOM.createPortal(
        (
            <ModalOverlay onModalClose={onModalClose}>
                <div className={modal.modal} style={{ height: `${modalHeightValue}` }}>
                    <img src={closeIcon} alt='close-icon' className={modal.closeIcon} onClick={onModalClose} />
                    {children}
                </div>
            </ModalOverlay>
        ), modalRoot
    );
};

export default Modal;