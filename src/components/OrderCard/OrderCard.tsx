import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, useLocation } from 'react-router-dom';
import orderCard from './OrderCard.module.css';
import tempImage from '../../images/ingredients.png';

export const OrderCard = (props: { id: string }) => {
  const history = useHistory();
  const location = useLocation<any>();
  const handleClick = () => {
    if (location.pathname === '/feed') history.replace({ pathname: `/feed/${props.id}`, state: { backgroundForFeed: location } });
    if (location.pathname === '/profile/orders')
      history.replace({ pathname: `/profile/orders/${props.id}`, state: { backgroundForProfile: location } });
  };
  return (
    <div className={orderCard.card} onClick={handleClick}>
      <div className={orderCard.numberInfo}>
        <p className='text text_type_main-medium'>#034535</p>
        <p className='text text_type_main-small text_color_inactive'>Сегодня, 16:20 i-GMT+3</p>
      </div>
      <p className='text text_type_main-medium'>Death Star Starship Main бургер</p>
      <div className={orderCard.detailsInfo}>
        <img src={tempImage} alt='tempOrder' />
        <div className={orderCard.cost}>
          <p className='text text_type_main-medium mr-2'>480</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
};
