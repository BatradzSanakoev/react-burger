import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import register from './Register.module.css';
import { MAIN_API, emailRegex } from '../../utils/constants';

export const Register = () => {
  const history = useHistory();
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
    fetch(`${MAIN_API}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password, name: username })
    })
      .then(res => {
        if (res.ok) return res.json();
        else setEmailError(true);
      })
      .then(res => {
        if (res.success) history.push('/login');
        else setEmailError(true);
      })
      .catch(() => setEmailError(true));
  };

  useEffect(() => (email.length > 0 && !email.match(emailRegex) ? setEmailError(true) : setEmailError(false)), [email]);

  return (
    <section className={register.section}>
      <div className={register.content}>
        <form onSubmit={onSubmit} noValidate className={register.form}>
          <h2 className='text text_type_main-large'>Регистрация</h2>
          <Input type='text' placeholder='Имя' name='username' value={username || ''} onChange={onChange} />
          <Input type='email' placeholder='E-mail' name='email' value={email || ''} onChange={onChange} error={emailError} errorText={errorText} />
          <PasswordInput name='password' value={password || ''} onChange={onChange} />
          <button type='submit' className={`${register.button} mt-4 p-4 text text_type_main-medium`}  disabled={!email || emailError || !password || !username}>
            Зарегистрироваться
          </button>
        </form>
        <div>
          <div className='text text_type_main-default text_color_inactive'>
            <span>Уже зарегистрированы?</span>
            <Link to='/login' className={`${register.link} ml-2`}>
              Войти
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
