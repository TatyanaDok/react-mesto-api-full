import React, { useState } from "react";

import Header from "./Header";
import {Link} from "react-router-dom";

function Register({ handleRegister }) {
  const [regData, setRegData] = useState({email: '', password: ''});

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(regData);
  }

  function handleOnChange(evt) {
    const {name, value} = evt.target;
    setRegData({ ...regData, [name]: value });
  }

  return (
    <>
      <Header headerText={'Войти'} link="/sign-in" />
      <div className="authorization">
        <form onSubmit={handleSubmit}
              className="authorization__wrapper">
          <h3 className="authorization__title">Регистрация</h3>
          <input type="email"
                 required
                 minLength="2"
                 maxLength="200"
                 name="email"
                 className="authorization__data"
                 value={regData.email}
                 onChange={handleOnChange}
                 placeholder="Email"
          />
          <input type="password"
                 required
                 minLength="2"
                 maxLength="200"
                 name="password"
                 className="authorization__data"
                 value={regData.password}
                 onChange={handleOnChange}
                 placeholder="Пароль"
          />
          <button className="authorization__button"
                  type="submit"
          >Зарегистрироваться</button>
          <Link to="/sign-in"
                className="authorization__login-text"
          >Уже зарегистрированы? Войти</Link>
        </form>
      </div>
    </>
  );
}

export default Register;