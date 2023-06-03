import React from "react";

const Login = ({ title, onLogin, buttonText }) => {
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
    onLogin(formValue);
    
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
