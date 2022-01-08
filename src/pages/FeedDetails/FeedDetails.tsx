import React, { useEffect, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import feedDetails from './FeedDetails.module.css';
import { TBurgerIngredientType } from '../../utils/types';
import { getDate, WS_Url } from '../../utils/constants';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/types';

export const FeedDetails = () => {
  const location = useLocation<any>();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const backgroundForFeed = location.state?.backgroundForFeed;
  const backgroundForProfile = location.state?.backgroundForProfile;
  const { orders } = useSelector(state => state.orders);
  const { ingredients } = useSelector(state => state.burgerIngredients);

  const order = useMemo(() => {
    return orders.find(item => item._id === id);
  }, [id, orders]);

  const ingredientsInfo = (ingredients: Array<TBurgerIngredientType> | null) => {
    let result: Array<TBurgerIngredientType> = [];
    order?.ingredients.map(item => {
      ingredients!.forEach(element => {
        if (element._id === item) result.push(element);
      });
    });
    return result;
  };

  const ingredientsInOrder = ingredientsInfo(ingredients);
  const orderPrice = useMemo(() => {
    let price: number = 0;
    ingredientsInOrder.forEach(item => (price += item.price));
    return price;
  }, [ingredientsInOrder]);

  useEffect(() => {
    if (!location.state) dispatch({ type: WS_CONNECTION_START, payload: `${WS_Url}/all` });
    return () => {
      if (!location.state) dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);

  if (!order) return null;
  return (
    <div style={{ width: '100%', height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          width: `${backgroundForFeed || backgroundForProfile ? '80%' : '35%'}`,
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
        <p className='text text_type_digits-default' style={{ textAlign: 'center' }}>{`#${order?.number}`}</p>
        <div>
          <p className='text text_type_main-medium'>{order?.name}</p>
          <p className='text text_type_main-small' style={{ color: '#00CCCC' }}>
            {order?.status}
          </p>
        </div>
        <p className='text text_type_main-medium'>Состав:</p>
        <div className={feedDetails.list}>
          {ingredientsInOrder.map(item => (
            <div key={item._id + Math.random()} style={{ width: '95%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={item.image_mobile} alt='ingredientLogo' style={{ width: 64, height: 64 }} />
                <span className='text text_type_main-small'>{item.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p className={`text text_type_main-medium mr-2`}>{item.price}</p>
                <CurrencyIcon type='primary' />
              </div>
            </div>
          ))}
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p className='text text_type_main-small text_color_inactive'>{getDate(order!.createdAt)}</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className={`text text_type_main-medium mr-2`}>{orderPrice}</p>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    </div>
  );
};
