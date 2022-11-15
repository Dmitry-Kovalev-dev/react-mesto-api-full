import { NavLink } from "react-router-dom";

const Header = (props) => {
  const { loggedIn, activeUser, onLogout } = props;

  const link = loggedIn ?
    (<NavLink
      to="/signup"
      className="header__action-btn"
      onClick={onLogout}
      style={{ color: '#a9a9a9' }}>
      Выйти
    </NavLink>) :
    (<>
      <NavLink
        to="/signup"
        className="header__action-btn"
        activeClassName="header__action-btn_active">
        Регистрация
      </NavLink>

      <NavLink
        to="/signin"
        className="header__action-btn"
        activeClassName="header__action-btn_active">
        Войти
      </NavLink>
    </>);

  return (
    <header className="header">
      <div className="header__logo"></div>
      <nav className="header__navigation">
        <p className="header__email">{activeUser}</p>
        {link}
      </nav>
    </header>
  );
}

export default Header;