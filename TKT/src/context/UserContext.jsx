import * as jwtDecode from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

// Create a context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode.jwtDecode(token);
        setUser(decodedToken);
        console.log(user);
      } catch (error) {
        // If the token is invalid, delete it
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
      const decodedToken = jwtDecode.jwtDecode(data.token);
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
      value={{ user, handleLogin, handleLogout, isLoggedIn, isAdmin }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
