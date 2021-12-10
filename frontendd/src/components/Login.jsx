import React, { useState } from "react";
import { Link } from "react-router-dom";

import Header from "./Header";

function Login({ handleLogin }) {
  const [authData, setAuthData] = useState({email: '', password: ''});

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(authData);
  }

  function handleOnChange(evt) {
    const { name, value } = evt.target;
    setAuthData({ ...authData, [name]: value });
  }

  return (
    <>
      <Header headerText="Регистрация" link="/sign-up" />
      <div className="authorization">
        <form onSubmit={handleSubmit}
              className="authorization__wrapper">
          <h3 className="authorization__title">Вход</h3>
          <input type="email"
                 required
                 minLength="2"
                 maxLength="200"
                 name="email"
                 className="authorization__data"
                 value={authData.email}
                 onChange={handleOnChange}
                 placeholder="Email"
          />
          <input type="password"
                 required
                 minLength="2"
                 maxLength="200"
                 name="password"
                 className="authorization__data"
                 value={authData.password}
                 onChange={handleOnChange}
                 placeholder="Пароль"
          />
          <button className="authorization__button"
                  type="submit"
          >Войти</button>
          <Link to="/sign-up"
                className="authorization__login-text"
          >Нет учетной записи? Зарегистрироваться</Link>
        </form>
      </div>
    </>
  );
}

export default Login;