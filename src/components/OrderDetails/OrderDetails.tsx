import React from 'react';
import { useSelector } from '../../services/hooks';
import orderDetails from './OrderDetails.module.css';
import doneIcon from '../../images/done.png';

const OrderDetails = () => {
  const { orderNumber, orderRequest } = useSelector(state => state.order);
  return (
    <>
      {!orderRequest ? (
        <div className={orderDetails.container}>
          <h3 className={`text text_type_digits-large ${orderDetails.order}`}>{orderNumber}</h3>
          <p className={`text text_type_main-medium ${orderDetails.orderIdText}`}>идентификатор заказа</p>
          <img src={doneIcon} alt='done-icon' style={{ width: 120, height: 120 }} />
          <p className={`text text_type_main-default`}>Ваш заказ начали готовить</p>
          <p className={`text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
        </div>
      ) : (
        <div className={orderDetails.container} style={{ justifyContent: 'center' }}>
          <h1 className='text text_type_main-large'>Загрузка...</h1>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
