import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeader from './AppHeader.module.css';

const AppHeader = () => {
  return (
    <header className={`${appHeader.header} pt-4 pb-4`}>
      <div className={appHeader.headerContent}>
        <div className={`${appHeader.navGroup}`}>
          <NavLink to='/' className={`${appHeader.navButton} pt-4 pb-4 pl-5 pr-5 mr-2`} activeClassName={appHeader.activeNavButton}>
            <BurgerIcon type='primary' />
            <p className={`text text_type_main-medium ml-2 ${appHeader.navText}`}>Конструктор</p>
          </NavLink>
          <NavLink to='/' className={`${appHeader.navButton} pt-4 pb-4 pl-5 pr-5`} activeClassName={appHeader.activeNavButton}>
            <ListIcon type='secondary' />
            <p className={`text text_type_main-medium text_color_inactive ml-2 ${appHeader.navText}`}>Лента заказов</p>
          </NavLink>
        </div>
        <Logo />
        <div className={`${appHeader.navGroup}`} style={{ justifyContent: 'flex-end' }}>
          <NavLink to='/profile' className={`${appHeader.navButton} pt-4 pb-4 pl-5 pr-5`} activeClassName={appHeader.activeNavButton}>
            <ProfileIcon type='secondary' />
            <p className={`text text_type_main-medium text_color_inactive ml-2 ${appHeader.navText}`}>Личный кабинет</p>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
