import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import login from './Login.module.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = e => {
    const target = e.target;
    target.name === 'email' ? setEmail(target.value) : setPassword(target.value);
  };

  return (
    <main className={login.section}>
      <div className={login.content}>
        <form onSubmit={e => e.preventDefault()} noValidate className={login.form}>
          <h2 className='text text_type_main-large'>Вход</h2>
          <EmailInput name='email' value={email || ''} onChange={onChange} />
          <PasswordInput name='password' value={password || ''} onChange={onChange} />
          <button type='submit' className={`${login.button} mt-4 p-4 text text_type_main-medium`}>
            Вход
          </button>
        </form>
        <div>
          <div className='text text_type_main-default text_color_inactive'>
            <span>Вы — новый пользователь?</span>
            <Link to='/register' className={`${login.link} ml-2`}>
              Зарегистрироваться
            </Link>
          </div>
          <div className='text text_type_main-default text_color_inactive'>
            <span>Забыли пароль?</span>
            <Link to='/forgot-password' className={`${login.link} ml-2`}>
              Восстановить пароль
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
