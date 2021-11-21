import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import profile from './Profile.module.css';
import { getUser } from '../../services/actions/user';

export const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const onChange = e => {
    const target = e.target;
    target.name === 'email' ? setEmail(target.value) : setName(target.value);
  };

  useEffect(() => dispatch(getUser()), []);

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
          <p className={`text text_type_main-small text_color_inactive ${profile.navText}`}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        {user.email ? (
          <div className={profile.profileColumn}>
            <Input type='text' icon='EditIcon' placeholder='Имя' name='name' value={user.name || name} onChange={onChange} />
            <Input type='email' icon='EditIcon' placeholder='Логин' name='email' value={user.email || email} onChange={onChange} />
            <Input type='password' icon='EditIcon' placeholder='Пароль' value='Batradz777' />
          </div>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
};
