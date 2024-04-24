import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginSuccessful = await handleLogin(username, password);
    if (loginSuccessful) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, [isLoggedIn(), navigate]);

  return (
    <form className="login" onSubmit={handleSubmit}>
      <div className="login__header">
        <h2>DÉJÀ UN COMPTE PARC ASTÉRIX ?</h2>
        <p>Connectez-vous !</p>
      </div>
      <div className="login__content">
        <input
          placeholder="Nom d'utilisateur"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="">Forgot your password ?</a>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default Login;
