import React, { useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import orderCard from './OrderCard.module.css';
import tempImage from '../../images/ingredients.png';
import { TOrder } from '../../utils/types';
import { getDate } from '../../utils/constants';

export const OrderCard = (props: TOrder) => {
  const history = useHistory();
  const location = useLocation<any>();
  const { ingredients } = useSelector(state => state.burgerIngredients);
  const orderSum = useMemo(() => {
    let sum = 0;
    const prop = props.ingredients;
    ingredients!.forEach(item => {
      for (let i = 0; i < prop.length; i++) {
        if (item._id === prop[i]) sum += item.price;
      }
    });
    return sum;
  }, [ingredients, props.ingredients]);

  const handleClick = () => {
    if (location.pathname === '/feed') history.replace({ pathname: `/feed/${props._id}`, state: { backgroundForFeed: location } });
    if (location.pathname === '/profile/orders')
      history.replace({ pathname: `/profile/orders/${props._id}`, state: { backgroundForProfile: location } });
  };

  return (
    <div className={orderCard.card} onClick={handleClick}>
      <div className={orderCard.numberInfo}>
        <p className='text text_type_main-medium'>{`#${props.number}`}</p>
        <p className='text text_type_main-small text_color_inactive'>{getDate(props.createdAt)}</p>
      </div>
      <p className='text text_type_main-medium'>{props.name}</p>
      {location.pathname === '/profile/orders' && (
        <p className='text text_type_main-small' style={{ color: `${props.status === 'done' && '#00cccc'}` }}>
          {props.status}
        </p>
      )}
      <div className={orderCard.detailsInfo}>
        <img src={tempImage} alt='tempOrder' />
        <div className={orderCard.cost}>
          <p className='text text_type_main-medium mr-2'>{orderSum}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
};
