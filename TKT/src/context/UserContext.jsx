import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

// Create a context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const current_time = Date.now().valueOf() / 1000;
        if (decodedToken.exp < current_time) {
          console.log("Token expired.");
          localStorage.removeItem("token");
        } else {
          setUser(decodedToken);
          console.log(user);
        }
      } catch (error) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogin = async (login, password) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error("Error during login");
      }

      const data = await response.json();
      console.log(data);

      localStorage.setItem("token", data.token);
      const decodedToken = jwtDecode(data.token);
      setUser(decodedToken);
    } catch (error) {
      // Handle error during login
      console.error(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const isLoggedIn = () => {
    return user !== null;
  };

  const isAdmin = () => {
    return user && user.isAdmin;
  };

  return (
    <UserContext.Provider
      value={{ user, token, handleLogin, handleLogout, isLoggedIn, isAdmin }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
