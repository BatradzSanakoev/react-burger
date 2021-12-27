import React from 'react';
import feed from './Feed.module.css';
import { OrderCard } from '../../components/OrderCard/OrderCard';

export const Feed = () => {
  return (
    <div className={feed.main}>
      <div style={{ width: '87%' }}>
        <p className='text text_type_main-medium'>Лента заказов</p>
      </div>
      <div className={feed.content}>
        <div style={{ width: '49%' }}>
          <div className={feed.ordersList}>
            <OrderCard id={'034535'} />
          </div>
        </div>
        <div style={{ width: '49%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ width: '95%', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '49%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p className='text text_type_main-medium'>Готовы:</p>
              <div>
                <p className='text text_type_digits-default' style={{ color: '#00CCCC' }}>
                  034533
                </p>
                <p className='text text_type_digits-default' style={{ color: '#00CCCC' }}>
                  034533
                </p>
                <p className='text text_type_digits-default' style={{ color: '#00CCCC' }}>
                  034533
                </p>
                <p className='text text_type_digits-default' style={{ color: '#00CCCC' }}>
                  034533
                </p>
                <p className='text text_type_digits-default' style={{ color: '#00CCCC' }}>
                  034533
                </p>
              </div>
            </div>
            <div style={{ width: '49%' }}>
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
            <p
              className='text text_type_digits-large'
              style={{
                color: '#F2F2F3',
                textShadow: '0px 0px 16px rgba(51, 51, 255, 0.25), 0px 0px 8px rgba(51, 51, 255, 0.25), 0px 4px 32px rgba(51, 51, 255, 0.5)'
              }}>
              28 752
            </p>
          </div>
          <div>
            <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
            <p
              className='text text_type_digits-large'
              style={{
                color: '#F2F2F3',
                textShadow: '0px 0px 16px rgba(51, 51, 255, 0.25), 0px 0px 8px rgba(51, 51, 255, 0.25), 0px 4px 32px rgba(51, 51, 255, 0.5)'
              }}>
              138
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
