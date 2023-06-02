import React from "react";

const Login = ({ title, formValue, handleChange, onLogin, buttonText }) => {
  return (
    <div className="login">
      <h1>{title}</h1>
      <form className="login__form" onSubmit={onLogin}>
        <input
          className="login__form-input"
          name="email"
          value={formValue.email}
          onChange={handleChange}
          placeholder="E-mail"
          minLength="2"
          maxLength="40"
          type="email"
          required
        ></input>
        <input
          className="login__form-input"
          name="password"
          minLength="2"
          maxLength="40"
          value={formValue.password}
          onChange={handleChange}
          placeholder="Пароль"
          type="password"
          required
        ></input>
        <button className="login__form-button" type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default Login;
