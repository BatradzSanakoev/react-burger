import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import forgotPassword from './ForgotPassword.module.css';
import { MAIN_API, emailRegex } from '../../utils/constants';

export const ForgotPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const errorText = 'Некорректный email';

  const onChange = e => {
    const target = e.target;
    target.name === 'email' && setEmail(target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    fetch(`${MAIN_API}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })
      .then(res => {
        if (res.ok) return res.json();
        else setEmailError(true);
      })
      .then(res => {
        if (res.success) history.push('/reset-password');
        else setEmailError(true);
      })
      .catch(() => setEmailError(true));
  };

  useEffect(() => (email.length > 0 && !email.match(emailRegex) ? setEmailError(true) : setEmailError(false)), [email]);

  return (
    <section className={forgotPassword.section}>
      <div className={forgotPassword.content}>
        <form onSubmit={onSubmit} noValidate className={forgotPassword.form}>
          <h2 className='text text_type_main-large'>Восстановление пароля</h2>
          <Input
            type='email'
            placeholder='Укажите e-mail'
            name='email'
            value={email || ''}
            onChange={onChange}
            error={emailError}
            errorText={errorText}
          />
          <button type='submit' className={`${forgotPassword.button} mt-4 p-4 text text_type_main-medium`} disabled={!email || emailError}>
            Восстановить
          </button>
        </form>
        <div>
          <div className='text text_type_main-default text_color_inactive'>
            <span>Вспомнили пароль?</span>
            <Link to='/login' className={`${forgotPassword.link} ml-2`}>
              Войти
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
