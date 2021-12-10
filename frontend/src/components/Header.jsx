import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header({ headerText, link, loggedIn, onClick }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <header className="header">
      <div className="header__wrapper">
        <img
          className="header__logo"
          src={logo}
          alt="Логотип проекта 'Место'"
        />
        <div className="header__wrapper-link">
          <p className="header__user-email">{currentUser.email}</p>
          <Link
            to={link}
            onClick={onClick}
            className={`${loggedIn && "header__link_logout"} header__link`}
          >
            {headerText}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
