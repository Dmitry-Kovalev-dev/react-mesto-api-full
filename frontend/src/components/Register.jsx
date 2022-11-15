import { useState } from "react";
import { Link } from "react-router-dom";

const Register = (props) => {

  const { onRegister } = props;

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
    const { password, email } = input
    onRegister(password, email);
  };

  return (
    <div className="popup popup_type_auth">
      <div className="popup__container popup__container_type_auth">
        <h2 className="popup__title popup__title_type_auth">Регистрация</h2>
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
                value={input.password}
                onChange={handleChange}
                required
              />
              <span className="popup__input-error password-input-error" />
            </label>
          </fieldset>
          <button type="submit" className="popup__save-input-btn popup__save-input-btn_type_auth">Зарегистрироваться</button>
        </form>
        <Link to='./signin' className="popup__button-caption">Уже зарегистрированы? Войти</Link>
      </div>
    </div>
  );
};

export default Register;