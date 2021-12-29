import React, { useEffect } from 'react';
import feed from './Feed.module.css';
import { OrderCard } from '../../components/OrderCard/OrderCard';
import { useDispatch, useSelector } from '../../services/hooks';
import { GetOrdersAll } from '../../services/actions/orders';

export const Feed = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetOrdersAll());
  }, []);
  return (
    <div className={feed.main}>
      <div style={{ width: '87%' }}>
        <p className='text text_type_main-medium'>Лента заказов</p>
      </div>
      <div className={feed.content}>
        <div className={feed.feed}>
          <div className={feed.ordersList}>
            <OrderCard id={'034535'} />
          </div>
        </div>
        <div className={feed.orders}>
          <div className={feed.ordersNumbers}>
            <div className={feed.ordersReady}>
              <p className='text text_type_main-medium'>Готовы:</p>
              <div>
                <p className={`text text_type_digits-default ${feed.colorfulDigits}`}>034533</p>
                <p className={`text text_type_digits-default ${feed.colorfulDigits}`}>034533</p>
                <p className={`text text_type_digits-default ${feed.colorfulDigits}`}>034533</p>
                <p className={`text text_type_digits-default ${feed.colorfulDigits}`}>034533</p>
                <p className={`text text_type_digits-default ${feed.colorfulDigits}`}>034533</p>
              </div>
            </div>
            <div className={feed.ordersInWork}>
              <p className='text text_type_main-medium'>В работе:</p>
              <div>
                <p className='text text_type_digits-default'>034533</p>
                <p className='text text_type_digits-default'>034533</p>
                <p className='text text_type_digits-default'>034533</p>
              </div>
            </div>
          </div>
          <div>
            <p className='text text_type_main-medium'>Выполнено за все время:</p>
            <p className={`text text_type_digits-large ${feed.largeDigits}`}>28 752</p>
          </div>
          <div>
            <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
            <p className={`text text_type_digits-large ${feed.largeDigits}`}>138</p>
          </div>
        </div>
      </div>
    </div>
  );
};
