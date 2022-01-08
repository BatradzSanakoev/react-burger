import React, { useEffect, useMemo } from 'react';
import feed from './Feed.module.css';
import { OrderCard } from '../../components/OrderCard/OrderCard';
import { useSelector, useDispatch } from '../../services/hooks';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/types';
import { WS_Url } from '../../utils/constants';

export const Feed = () => {
  const dispatch = useDispatch();
  const { total, totalToday, orders } = useSelector(state => state.orders);

  const doneOrders = useMemo(() => {
    return orders.filter(item => item.status === 'done').slice(0, 5);
  }, [orders]);

  const pendingOrders = useMemo(() => {
    return orders.filter(item => item.status === 'pending').slice(0, 10);
  }, [orders]);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: `${WS_Url}/all` });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);

  return (
    <div className={feed.main}>
      <div style={{ width: '87%' }}>
        <p className='text text_type_main-medium'>Лента заказов</p>
      </div>
      <div className={feed.content}>
        <div className={feed.feed}>
          <div className={feed.ordersList}>
            {orders.map(order => (
              <OrderCard
                key={order._id}
                _id={order._id}
                createdAt={order.createdAt}
                updatedAt={order.updatedAt}
                status={order.status}
                number={order.number}
                name={order.name}
                ingredients={order.ingredients}
              />
            ))}
          </div>
        </div>
        <div className={feed.orders}>
          <div className={feed.ordersNumbers}>
            <div className={feed.ordersReady}>
              <p className='text text_type_main-medium'>Готовы:</p>
              <div>
                {doneOrders.map(item => (
                  <p key={Math.random()} className={`text text_type_digits-default ${feed.colorfulDigits}`}>
                    {item.number}
                  </p>
                ))}
              </div>
            </div>
            <div className={feed.ordersInWork}>
              <p className='text text_type_main-medium'>В работе:</p>
              <div>
                {pendingOrders.map(item => (
                  <p key={Math.random()} className='text text_type_digits-default'>
                    {item.number}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className='text text_type_main-medium'>Выполнено за все время:</p>
            <p className={`text text_type_digits-large ${feed.largeDigits}`}>{total}</p>
          </div>
          <div>
            <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
            <p className={`text text_type_digits-large ${feed.largeDigits}`}>{totalToday}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
