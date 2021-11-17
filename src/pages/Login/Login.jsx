import React from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <section style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Вход</h2>
        <div>
          <form onSubmit={e => e.preventDefault()} noValidate>
            <input type='email' placeholder='E-mail' name='email' />
            <input type='password' placeholder='Password' name='password' />
            <button type='submit'>Вход</button>
          </form>
        </div>
        <div>
          <div>
            <span>Вы — новый пользователь?</span>
            <Link to='#'>Зарегистрироваться</Link>
          </div>
          <div>
            <span>Забыли пароль?</span>
            <Link to='#'>Восстановить пароль</Link>
          </div>
          <div>
            <Link to='/'>На главную</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
