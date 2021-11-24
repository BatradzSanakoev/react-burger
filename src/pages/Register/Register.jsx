import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import { PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import registerStyles from './Register.module.css';
import { emailRegex } from '../../utils/constants';
import { register } from '../../services/actions/user';

export const Register = () => {
  const dispatch = useDispatch();
  const { user, isAuth, getUserRequest } = useSelector(state => state.user);
  const history = useHistory();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const errorText = 'Некорректный email';

  const onChange = e => {
    const target = e.target;
    target.name === 'email' ? setEmail(target.value) : target.name === 'username' ? setUsername(target.value) : setPassword(target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(register({ email: email, name: username, password: password, history: history }));
  };

  useEffect(() => (email.length > 0 && !email.match(emailRegex) ? setEmailError(true) : setEmailError(false)), [email]);

  if (isAuth) {
    return <Redirect to={location.state?.from || '/profile'} />;
  } else if (getUserRequest) return null;

  return (
    <main className={registerStyles.section}>
      <div className={registerStyles.content}>
        <form onSubmit={onSubmit} noValidate className={registerStyles.form}>
          <h2 className='text text_type_main-large'>Регистрация</h2>
          <Input type='text' placeholder='Имя' name='username' value={username || ''} onChange={onChange} />
          <Input type='email' placeholder='E-mail' name='email' value={email || ''} onChange={onChange} error={emailError} errorText={errorText} />
          <PasswordInput name='password' value={password || ''} onChange={onChange} />
          <button
            type='submit'
            className={`${registerStyles.button} mt-4 p-4 text text_type_main-medium`}
            disabled={!email || emailError || !password || !username || user.registerError}>
            Зарегистрироваться
          </button>
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