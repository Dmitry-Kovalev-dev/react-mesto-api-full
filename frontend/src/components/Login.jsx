import { useState } from "react";

const Login = (props) => {

  const { onLogin } = props;

  const [input, setInput] = useState({
    password: '',
    email: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInput(old => ({ ...old, [name]: value }))
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { password, email } = input;
    onLogin(password, email);
  };

  return (
    <div className="popup popup_type_auth">
      <div className="popup__container popup__container_type_auth">
        <h2 className="popup__title popup__title_type_auth">Вход</h2>
        <form
          action="#"
          className="popup__form popup__form_type_auth"
          name="auth"
          onSubmit={handleSubmit}
        >
          <fieldset className="popup__form-inputs">
            <label className="popup__formfield">
              <input
                id="email"
                type="email"
                className="popup__input popup__input_type_auth"
                name="email"
                placeholder="Email"
                value={input.email}
                onChange={handleChange}
                required
              />
              <span className="popup__input-error email-input-error" />
            </label>
            <label className="popup__formfield">
              <input
                id="password"
                type="password"
                className="popup__input popup__input_type_auth"
                name="password"
                placeholder="Пароль"
                input={input.password}
                minLength={6}
                onChange={handleChange}
                required
              />
              <span className="popup__input-error password-input-error" />
            </label>
          </fieldset>
          <button type="submit" className="popup__save-input-btn popup__save-input-btn_type_auth">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default Login;