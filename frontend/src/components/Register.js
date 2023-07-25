import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleRegisterEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleRegisterPassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <div className="authentication">
      <h2 className="authentication__title">Регистрация</h2>
      <form className="authentication__form" onSubmit={handleSubmit}>
        <input
          className="authentication__input"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleRegisterEmail}
          required
        />
        <input
          className="authentication__input"
          name="password"
          type="password"
          placeholder="Пароль"
          onChange={handleRegisterPassword}
          required
        />
        <button className="authentication__submit" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="authentication__question">
        Уже зарегистрированы?
        <Link to="/sign-in" className="authentication__link">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
