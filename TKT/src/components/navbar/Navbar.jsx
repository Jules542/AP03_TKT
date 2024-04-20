import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import Moon from "../../assets/images/moon.svg";
import Sun from "../../assets/images/sun.svg";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const { handleLogout, isLoggedIn, isAdmin } = useContext(UserContext);
  const [navbar, setNavbar] = useState(window.innerWidth >= 1024);
  const [isOpen, setIsOpen] = useState(false);
  const { toggleDark, isDark } = useContext(ThemeContext);

  useEffect(() => {
    const handleResize = () => {
      setNavbar(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    document.body.classList.toggle("theme--dark", isDark);
    document.body.classList.toggle("theme--light", !isDark);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isDark]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {navbar ? (
        <nav className="navbar">
          <ul>
            <div className="navbar__left">
              <img src={Logo} alt="logo" draggable="false" />
              <li>
                <Link to="/">Home</Link>
              </li>
              {isLoggedIn() && isAdmin() && (
                <li>
                  <Link to="/avertissements">Avertissements</Link>
                </li>
              )}
              <li>
                <Link to="/attractions">Attractions</Link>
              </li>
              {isLoggedIn() && isAdmin() ? (
                <li>
                  <Link to="/affectations">Affectation de missions</Link>
                </li>
              ) : null}
              {isLoggedIn() && isAdmin() ? (
                <li>
                  <Link to="/gestion-utilisateurs">Gestion des comptes</Link>
                </li>
              ) : null}
            </div>
            <div className="navbar__right">
              <a onClick={toggleDark}>
                {isDark ? (
                  <img src={Sun} draggable="false" />
                ) : (
                  <img src={Moon} draggable="false" />
                )}
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
      ) : (
        <div className="navbar__mobile">
          <img src={Logo} alt="logo" draggable="false" />

          {isOpen && (
            <div className="navbar__mobile-container">
              <ul className="navbar__mobile-links">
                <div className="navbar__top">
                  <img
                    className="navbar__img"
                    src={Logo}
                    alt="logo"
                    draggable="false"
                  />
                  <a className="navbar__toggle-menu" onClick={toggleMenu}>
                    ✕
                  </a>
                </div>
                <li>
                  <Link to="/" onClick={toggleMenu}>
                    Home
                  </Link>
                </li>
                {isLoggedIn() && isAdmin() && (
                  <li>
                    <Link to="/avertissements" onClick={toggleMenu}>
                      Avertissements
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/attractions" onClick={toggleMenu}>
                    Attractions
                  </Link>
                </li>
                {isLoggedIn() && isAdmin() ? (
                  <li>
                    <Link to="/affectations" onClick={toggleMenu}>
                      Affectation de missions
                    </Link>
                  </li>
                ) : null}
                {isLoggedIn() && isAdmin() ? (
                  <li>
                    <Link to="/gestion-utilisateurs" onClick={toggleMenu}>
                      Gestion des comptes
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>
          )}
          <div className="navbar__mobile-actions">
            {!isLoggedIn() && (
              <li className="navbar__log">
                <Link to="/login">Login</Link>
              </li>
            )}
            {isLoggedIn() && (
              <li className="navbar__log">
                <a
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  Logout
                </a>
              </li>
            )}
            <a className="navbar__toggle-menu" onClick={toggleMenu}>
              ☰
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
