import React from 'react';
import orderDetails from './OrderDetails.module.css';
import doneIcon from '../../images/done.png';

const OrderDetails = props => {
    const { closeIcon } = props;
    return (
        <div className={orderDetails.container}>
            <img src={closeIcon} alt='close-icon' className={orderDetails.closeIcon} onClick={props.onModalClose} />
            <h3 className={`text text_type_digits-large mt-30 ${orderDetails.order}`}>034536</h3>
            <p className={`text text_type_main-medium mt-8 ${orderDetails.orderIdText}`}>идентификатор заказа</p>
            <img src={doneIcon} alt='done-icon' className='mt-15' />
            <p className={`text text_type_main-default mt-15`}>Ваш заказ начали готовить</p>
            <p className={`text text_type_main-default text_color_inactive mt-2`}>Дождитесь готовности на орбитальной станции</p>
        </div>)
};

export default OrderDetails;