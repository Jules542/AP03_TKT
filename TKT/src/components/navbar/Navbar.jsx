import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const { handleLogout, isLoggedIn } = useContext(UserContext);
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/attractions">Attractions</Link>
        </li>
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
    </div>
  );
};

export default Navbar;
