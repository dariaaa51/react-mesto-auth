import React from "react";
import { Link } from "react-router-dom";

const Register = ({
  title,
  onRegister,
  buttonText,
}) => {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(formValue);
  }
  return (
    <div className="login">
      <h1>{title}</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__form-input"
          name="email"
          value={formValue.email}
          onChange={handleChange}
          placeholder="E-mail"
          type="email"
          minLength="2"
          maxLength="40"
          required
        ></input>
        <input
          className="login__form-input"
          name="password"
          value={formValue.password}
          onChange={handleChange}
          placeholder="Пароль"
          minLength="2"
          maxLength="40"
          type="password"
          required
        ></input>
        <button className="login__form-button" type="submit" name="save">
          {buttonText}
        </button>
        <Link className="login__link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
};

export default Register;
