import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, useLocation } from 'react-router-dom';
import orderCard from './OrderCard.module.css';
import tempImage from '../../images/ingredients.png';

export const OrderCard = (props: { id: string }) => {
  const history = useHistory();
  const location = useLocation();
  const handleClick = () => {
    if (location.pathname === '/feed') history.replace({ pathname: `/feed/${props.id}` });
    else history.replace({ pathname: `/profile/orders/${props.id}` });
  };
  return (
    <div className={orderCard.card} onClick={handleClick}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <p className='text text_type_main-medium'>#034535</p>
        <p className='text text_type_main-small text_color_inactive'>Сегодня, 16:20 i-GMT+3</p>
      </div>
      <p className='text text_type_main-medium'>Death Star Starship Main бургер</p>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src={tempImage} alt='tempOrder' />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p className={`text text_type_main-medium mr-2`}>480</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
};
