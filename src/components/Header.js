import React from "react";
import { Link, Route, Routes } from "react-router-dom";

const Header = ({ email, onSignOut }) => {
  return (
    <header className="header">
      <div className="header__logo" alt="Логотип"></div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="header__menu">
              <p className="header__email">{email}</p>
              <button className="header__button" onClick={onSignOut}>
                Выйти
              </button>
            </div>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        />
      </Routes>
    </header>
  );
};

export default Header;
