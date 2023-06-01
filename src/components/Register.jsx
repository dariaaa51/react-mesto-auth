import React from "react";
import { Link } from "react-router-dom";

const Register = ({
  title,
  onRegister,
  handleChange,
  formValue,
  buttonText,
}) => {
  return (
    <div className="authorization">
      <h1>{title}</h1>
      <form className="authorization-form" onSubmit={onRegister}>
        <input
          className="authorization-form__input"
          name="email"
          value={formValue.email}
          onChange={handleChange}
          placeholder="E-mail"
          type="email"
          required
        ></input>
        <input
          name="password"
          className="authorization-form__input"
          value={formValue.password}
          onChange={handleChange}
          placeholder="Пароль"
          type="password"
          required
        ></input>
        <button
          className="authorization-form__button"
          type="submit"
          name="save"
        >
          {buttonText}
        </button>
        <Link className="authorization__link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
};

export default Register;
