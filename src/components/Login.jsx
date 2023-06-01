import React from "react";

const Login = ({ title, formValue, handleChange, onLogin, buttonText }) => {
  return (
    <div className="authorization">
      <h1>{title}</h1>
      <form className="authorization-form" onSubmit={onLogin}>
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
      </form>
    </div>
  );
};

export default Login;
