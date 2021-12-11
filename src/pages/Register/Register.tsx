import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import registerStyles from './Register.module.css';
import { emailRegex } from '../../utils/constants';
import { register } from '../../services/actions/user';
import { RootState } from '../../services/reducers';
import { TAuthType } from '../../utils/types';

export const Register = () => {
  const dispatch = useDispatch();
  const { user, isAuth, getUserRequest } = useSelector((state: Omit<RootState, 'user'> & { user: TAuthType }) => state.user);
  const history = useHistory();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const errorText = 'Некорректный email';

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    target.name === 'email' ? setEmail(target.value) : target.name === 'username' ? setUsername(target.value) : setPassword(target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register({ email: email, name: username, password: password, history: history }));
  };

  useEffect(() => (email.length > 0 && !email.match(emailRegex) ? setEmailError(true) : setEmailError(false)), [email]);

  if (getUserRequest) return null;
  else if (!getUserRequest && isAuth) return <Redirect to={(location as any).state?.from || '/profile'} />;

  return (
    <main className={registerStyles.section}>
      <div className={registerStyles.content}>
        <form onSubmit={onSubmit} noValidate className={registerStyles.form}>
          <h2 className='text text_type_main-large'>Регистрация</h2>
          <Input type='text' placeholder='Имя' name='username' value={username || ''} onChange={onChange} />
          <Input type='email' placeholder='E-mail' name='email' value={email || ''} onChange={onChange} error={emailError} errorText={errorText} />
          <PasswordInput name='password' value={password || ''} onChange={onChange} />
          {/* @ts-ignore */}
          <Button type='primary' size='medium' disabled={!email || emailError || !password || !username || user.registerError}>
            Вход
          </Button>
          <p className='text text_type_main-small mt-2' style={{ color: 'red' }}>
            {user.errorText}
          </p>
        </form>
        <div>
          <div className='text text_type_main-default text_color_inactive'>
            <span>Уже зарегистрированы?</span>
            <Link to='/login' className={`${registerStyles.link} ml-2`}>
              Войти
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
