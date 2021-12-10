import React from "react";
import Header from "./Header";
import {Link} from "react-router-dom";

function Error() {
  return(
    <>
      <Header />
      <div className="error">
        <h3 className="error__title">Страница не найдена.</h3>
        <Link to="/" className="authorization__login-text">На главную.</Link>
      </div>
    </>
  );
}

export default Error;