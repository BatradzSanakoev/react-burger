import React from 'react';
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import feedDetails from './FeedDetails.module.css';

export const FeedDetails = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '35%', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <p className='text text_type_digits-default' style={{ textAlign: 'center' }}>{`#${id}`}</p>
        <div>
          <p className='text text_type_main-medium'>Death Star Starship Main бургер</p>
          <p className='text text_type_main-small' style={{ color: '#00CCCC' }}>
            Выполнен
          </p>
        </div>
        <p className='text text_type_main-medium'>Состав:</p>
        <div className={feedDetails.list}>
          <div style={{ width: '95%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src='https://code.s3.yandex.net/react/code/bun-02.png' alt='feed' style={{ width: 64, height: 64 }} />
              <span className='text text_type_main-small'>Краторная булка N-200i</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p className={`text text_type_main-medium mr-2`}>480</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>

          <div style={{ width: '95%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src='https://code.s3.yandex.net/react/code/bun-02.png' alt='feed' style={{ width: 64, height: 64 }} />
              <span className='text text_type_main-small'>Краторная булка N-200i</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p className={`text text_type_main-medium mr-2`}>480</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>

          <div style={{ width: '95%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src='https://code.s3.yandex.net/react/code/bun-02.png' alt='feed' style={{ width: 64, height: 64 }} />
              <span className='text text_type_main-small'>Краторная булка N-200i</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p className={`text text_type_main-medium mr-2`}>480</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>

          <div style={{ width: '95%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src='https://code.s3.yandex.net/react/code/bun-02.png' alt='feed' style={{ width: 64, height: 64 }} />
              <span className='text text_type_main-small'>Краторная булка N-200i</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p className={`text text_type_main-medium mr-2`}>480</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>

          <div style={{ width: '95%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src='https://code.s3.yandex.net/react/code/bun-02.png' alt='feed' style={{ width: 64, height: 64 }} />
              <span className='text text_type_main-small'>Краторная булка N-200i</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p className={`text text_type_main-medium mr-2`}>480</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>

          <div style={{ width: '95%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src='https://code.s3.yandex.net/react/code/bun-02.png' alt='feed' style={{ width: 64, height: 64 }} />
              <span className='text text_type_main-small'>Краторная булка N-200i</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p className={`text text_type_main-medium mr-2`}>480</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p className='text text_type_main-small text_color_inactive'>Сегодня, 16:20 i-GMT+3</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className={`text text_type_main-medium mr-2`}>480</p>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    </div>
  );
};
