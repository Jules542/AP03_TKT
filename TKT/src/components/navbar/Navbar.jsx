import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import Moon from "../../assets/images/moon.svg";
import Sun from "../../assets/images/sun.svg";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const { handleLogout, isLoggedIn, isAdmin } = useContext(UserContext);
  const { toggleDark, isDark } = useContext(ThemeContext);
  useEffect(() => {
    document.body.classList.toggle("theme--dark", isDark);
    document.body.classList.toggle("theme--light", !isDark);
  }, [isDark]);
  return (
    <nav className="navbar">
      <ul>
        <div className="navbar__left">
          <img src={Logo} alt="logo" />
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/attractions">Attractions</Link>
          </li>
          {isLoggedIn() && isAdmin() && (
            <li>
              <Link to="/affectations">Affectation de missions</Link>
            </li>
          )}
          {isLoggedIn() && isAdmin() && (
            <li>
              <Link to="/gestion-utilisateurs">Gestion des comptes</Link>
            </li>
          )}
        </div>
        <div className="navbar__right">
          <a onClick={toggleDark}>
            {isDark ? <img src={Sun} /> : <img src={Moon} />}
          </a>
          {!isLoggedIn() && (
            <li className="navbar__log">
              <Link to="/login">Login</Link>
            </li>
          )}
          {isLoggedIn() && (
            <li className="navbar__log">
              <a onClick={handleLogout}>Logout</a>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
