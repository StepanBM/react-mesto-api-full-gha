import React from "react";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleLoginEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleLoginPassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <div className="authentication">
      <h2 className="authentication__title">Вход</h2>
      <form className="authentication__form" onSubmit={handleSubmit}>
        <input
          className="authentication__input"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleLoginEmail}
          required
        />
        <input
          className="authentication__input"
          name="password"
          type="password"
          placeholder="Пароль"
          onChange={handleLoginPassword}
          required
        />
        <button className="authentication__submit" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
