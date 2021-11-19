import React from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import profile from './Profile.module.css';

export const Profile = () => {
  return (
    <main className={profile.main}>
      <div className={profile.content}>
        <div className={`${profile.navColumn}`}>
          <nav className={profile.navBar}>
            <NavLink to='/profile' className={`text text_type_main-large ${profile.navLink} pt-2 pb-2`} activeClassName={profile.activeNavLink}>
              Профиль
            </NavLink>
            <NavLink to='/profile/orders' className={`text text_type_main-large text_color_inactive ${profile.navLink} pt-2 pb-2`}>
              История заказов
            </NavLink>
            <NavLink to='/profile' className={`text text_type_main-large text_color_inactive ${profile.navLink} pt-2 pb-2`}>
              Выход
            </NavLink>
          </nav>
          <p className={`text text_type_main-medium text_color_inactive ${profile.navText}`}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div className={profile.profileColumn}>
          <Input type='text' icon='EditIcon' placeholder='Имя' />
          <Input type='email' icon='EditIcon' placeholder='Логин' />
          <Input type='password' icon='EditIcon' placeholder='Пароль' />
        </div>
      </div>
    </main>
  );
};
