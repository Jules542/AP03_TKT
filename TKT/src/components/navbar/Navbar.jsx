import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
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
      <img src={Logo} alt="logo" />
      <ul>
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
        <button onClick={toggleDark}>
          {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
        {!isLoggedIn() && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {isLoggedIn() && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
