import React, { useEffect, useState, ChangeEvent } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import profile from './Profile.module.css';
import { updateUser, logout } from '../../services/actions/user';
import { PasswordInput } from '../../components/CustomInputs/PasswordInput';
import { EmailInput } from '../../components/CustomInputs/EmailInput';
import { NameInput } from '../../components/CustomInputs/NameInput';
import { RootState } from '../../services/reducers';

type TAuthType = {
  registerRequest: boolean;
  registerError: boolean;
  authRequest: boolean;
  authError: boolean;
  logoutRequest: boolean;
  logoutError: boolean;
  errorText: string | null;
  getUserRequest: boolean;
  getUserError: boolean;
  getUserLoaded: boolean;
  userUpdateRequest: boolean;
  userUpdateError: boolean;
  isAuth: boolean;
  user: any;
};

export const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: Omit<RootState, 'user'> & { user: TAuthType }) => state.user);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('Batradz777');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    target.name === 'email' ? setEmail(target.value) : target.name === 'name' ? setName(target.value) : setPassword(target.value);
  };

  const cancelClick = () => {
    setEmail(user.user.email);
    setName(user.user.name);
    setPassword('Batradz777');
  };

  const exitClick = () => {
    dispatch(logout());
    history.replace('/login');
  };

  const saveUserInfo = () => {
    if (email !== user.user.email || name !== user.user.name) dispatch(updateUser({ email: email, name: name, password: password }));
  };

  useEffect(() => {
    setEmail(user.user.email);
    setName(user.user.name);
  }, [user.user.email, user.user.name]);

  return (
    <main className={profile.main}>
      <div className={profile.content}>
        <div className={`${profile.navColumn}`}>
          <nav className={profile.navBar}>
            <NavLink exact to='/profile' className={`text text_type_main-large ${profile.navLink} pt-2 pb-2`} activeClassName={profile.activeNavLink}>
              Профиль
            </NavLink>
            <NavLink
              to='/profile/orders'
              className={`text text_type_main-large ${profile.navLink} pt-2 pb-2`}
              activeClassName={profile.activeNavLink}>
              История заказов
            </NavLink>
            <NavLink
              to='/profile/exit'
              className={`text text_type_main-large ${profile.navLink} pt-2 pb-2`}
              activeClassName={profile.activeNavLink}
              onClick={exitClick}>
              Выход
            </NavLink>
          </nav>
          <p className={`text text_type_main-small text_color_inactive ${profile.navText}`}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div className={profile.profileColumn}>
          <div className={profile.profileInfo}>
            <NameInput placeholder='Имя' name='name' value={name} onChange={onChange} />
            <EmailInput placeholder='Логин' name='email' value={email} onChange={onChange} />
            <PasswordInput placeholder='Пароль' name='password' value={password} onChange={onChange} />
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Button size='medium' type='secondary' onClick={cancelClick}>
                Отмена
              </Button>
              <Button size='medium' type='primary' onClick={saveUserInfo}>
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
