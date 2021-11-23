import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import profile from './Profile.module.css';
import { getUser, updateUser } from '../../services/actions/user';
import { PasswordInput } from '../../components/CustomInputs/PasswordInput';
import { EmailInput } from '../../components/CustomInputs/EmailInput';
import { NameInput } from '../../components/CustomInputs/NameInput';

export const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('Batradz777');

  const onChange = e => {
    const target = e.target;
    target.name === 'email' ? setEmail(target.value) : target.name === 'name' ? setName(target.value) : setPassword(target.value);
  };

  const cancelClick = e => {
    e.preventDefault();
    setEmail(user.user.email);
    setName(user.user.name);
    setPassword('Batradz777');
  };

  const saveUserInfo = e => {
    e.preventDefault();
    if (email !== user.user.email || name !== user.user.name) dispatch(updateUser({ email: email, name: name, password: password }));
  };

//   useEffect(() => dispatch(getUser()), []);
  useEffect(() => {
    setEmail(user.user.email);
    setName(user.user.name);
  }, [user.user.email, user.user.name]);

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
        <div className={profile.profileColumn}>
          <NameInput placeholder='Имя' name='name' value={name} onChange={onChange} />
          <EmailInput placeholder='Логин' name='email' value={email} onChange={onChange} />
          <PasswordInput placeholder='Пароль' name='password' value={password} onChange={onChange} />
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 24 }}>
            <button
              type='submit'
              className='text text_type_main-small'
              style={{ border: 0, background: 'transparent', color: '#4C4CFF', cursor: 'pointer' }}
              onClick={cancelClick}>
              Отмена
            </button>
            <button
              type='submit'
              className='text text_type_main-small p-4 ml-4'
              style={{
                width: 167,
                background: 'linear-gradient(63.18deg, #801ab3 0%, #4c4cff 100%)',
                borderRadius: 64,
                color: '#f2f2f3',
                textAlign: 'center',
                border: 0,
                cursor: 'pointer'
              }}
              onClick={saveUserInfo}>
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
