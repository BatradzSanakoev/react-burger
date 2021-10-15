import React from 'react';
import modal from './Modal.module.css';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import closeIcon from '../../images/close-icon.png';

const Modal = props => {
    const heightValue = props.type === 'order' ? 90 : 70;
    return (
        <div className={modal.modal} style={{ height: `${heightValue}%` }}>
            {
                props.type === 'order'
                    ? <OrderDetails closeIcon={closeIcon} onModalClose={props.onModalClose} />
                    : <IngredientDetails closeIcon={closeIcon} onModalClose={props.onModalClose} ingredientProps={props.ingredientProps} />
            }
        </div>
    )
};

export default Modal;