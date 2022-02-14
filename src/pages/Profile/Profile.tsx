import React, { useEffect, useState, ChangeEvent } from 'react';
import { NavLink, useHistory, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import profile from './Profile.module.css';
import { updateUser, logout } from '../../services/actions/user';
import { PasswordInput } from '../../components/CustomInputs/PasswordInput';
import { EmailInput } from '../../components/CustomInputs/EmailInput';
import { NameInput } from '../../components/CustomInputs/NameInput';
import { OrderCard } from '../../components/OrderCard/OrderCard';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/types';
import { getCookie, WS_Url } from '../../utils/constants';

export const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');
  const user = useSelector(state => state.user);
  const { orders } = useSelector(state => state.orders);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('Batradz777');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    target.name === 'email' ? setEmail(target.value) : target.name === 'name' ? setName(target.value) : setPassword(target.value);
  };

  const cancelClick = () => {
    setEmail(user.user!.email);
    setName(user.user!.name);
    setPassword('Batradz777');
  };

  const exitClick = () => {
    dispatch(logout());
    history.replace('/login');
  };

  const saveUserInfo = () => {
    if (email !== user.user!.email || name !== user.user!.name) dispatch(updateUser({ email: email, name: name, password: password }));
  };

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: `${WS_Url}/all?token=${accessToken}` });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [accessToken, dispatch]);

  useEffect(() => {
    setEmail(user.user!.email);
    setName(user.user!.name);
  }, [user.user]);

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
        <Switch>
          <Route path='/profile' exact>
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
          </Route>
          <Route path='/profile/orders'>
            <div style={{ width: '50%' }}>
              <div className={profile.ordersList}>
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
          </Route>
        </Switch>
      </div>
    </main>
  );
};
