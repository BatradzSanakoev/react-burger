import React, { useRef, useState, useMemo } from 'react';
import { useSelector } from '../../services/hooks';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredients from './BurgerIngredients.module.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';

const BurgerIngredients = () => {
  const data = useSelector(state => state.burgerIngredients.ingredients);
  const tabsRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const mainsRef = useRef<HTMLDivElement>(null);
  const [currentTab, setCurrentTab] = useState('bun');
  const buns = useMemo(() => {
    return data && data.filter(item => item.type === 'bun');
  }, [data]);
  const sauces = useMemo(() => {
    return data && data.filter(item => item.type === 'sauce');
  }, [data]);
  const main = useMemo(() => {
    return data && data.filter(item => item.type === 'main');
  }, [data]);

  const checkActualTab = () => {
    const tabsTop = tabsRef.current!.getBoundingClientRect().top;
    const bunsDistance = Math.abs(tabsTop! - bunsRef.current!.getBoundingClientRect().top);
    const saucesDistance = Math.abs(tabsTop! - saucesRef.current!.getBoundingClientRect().top);
    const mainsDistance = Math.abs(tabsTop! - mainsRef.current!.getBoundingClientRect().top);
    const minValue = Math.min(bunsDistance, saucesDistance, mainsDistance);
    if (minValue === bunsDistance) {
      setCurrentTab('bun');
    } else if (minValue === saucesDistance) {
      setCurrentTab('sauce');
    } else {
      setCurrentTab('main');
    }
  };

  return (
    <div className={burgerIngredients.content}>
      <h1 className='mt-10 text text_type_main-large' style={{ marginBottom: 0 }}>
        Соберите бургер
      </h1>
      <div className={`${burgerIngredients.tabs} mt-5`} ref={tabsRef}>
        <Tab value='bun' active={currentTab === 'bun'} onClick={() => console.log('tabclick')}>
          Булки
        </Tab>
        <Tab value='sauce' active={currentTab === 'sauce'} onClick={() => console.log('tabclick')}>
          Соусы
        </Tab>
        <Tab value='main' active={currentTab === 'main'} onClick={() => console.log('tabclick')}>
          Начинка
        </Tab>
      </div>
      {data ? (
        <div className={burgerIngredients.categories} onScroll={checkActualTab}>
          <h2 className='mt-10 text text_type_main-medium' style={{ marginBottom: 0 }}>
            Булки
          </h2>
          <div className={`${burgerIngredients.category} pl-4 mt-6`} ref={bunsRef}>
            {buns &&
              buns.map(item => (
                <BurgerIngredient key={item._id} _id={item._id} type={item.type} image={item.image_large} price={item.price} name={item.name} />
              ))}
          </div>
          <h2 className='mt-10 text text_type_main-medium' style={{ marginBottom: 0 }}>
            Соусы
          </h2>
          <div className={`${burgerIngredients.category} pl-4 mt-6`} ref={saucesRef}>
            {sauces &&
              sauces.map(item => (
                <BurgerIngredient key={item._id} _id={item._id} type={item.type} image={item.image_large} price={item.price} name={item.name} />
              ))}
          </div>
          <h2 className='mt-10 text text_type_main-medium' style={{ marginBottom: 0 }}>
            Начинка
          </h2>
          <div className={`${burgerIngredients.category} pl-4 mt-6`} ref={mainsRef}>
            {main &&
              main.map(item => (
                <BurgerIngredient key={item._id} _id={item._id} type={item.type} image={item.image_large} price={item.price} name={item.name} />
              ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BurgerIngredients;
