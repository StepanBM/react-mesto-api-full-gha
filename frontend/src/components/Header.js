import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header({ mail, way, onClick, title }) {
  return (
    <header className="header">
      <img className="header__logo" alt="Место Россия" src={logo} />
      <nav className="header__user">
        <p className="header__email">{mail}</p>
        <Link to={way} className="header__link" type="button" onClick={onClick}>
          {title}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
