import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Avertissement from "../components/avertissements/Avertissement";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";


const Avertissements = () => {
  const { isLoggedIn, isAdmin } = useContext(UserContext);
  const [avertissements, setAvertissements] = useState([]);
  const [users, setUsers] = useState([]);
  const [niveaux, setNiveaux] = useState([]);

  const fetchData = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/niveaux", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
      })
      .then((response) => {
        setNiveaux(response.data);
      });
    axios
      .get("http://localhost:3000/usersNoAdmin", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      });
    axios
      .get("http://localhost:3000/avertissements")
      .then((response) => {
        setAvertissements(response.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="avertissements">
      <div className="avertissements-wrapper">
        <div className="avertissements-wrapper-first">
          <p>Accueil &gt; Avertissements</p>
          <h1>Avertissements</h1>
        </div>
        {isLoggedIn() && isAdmin() ? (
          <Link to="/avertissements/nouveau" className="avertissement-new">Nouveau</Link>
        ) : null}
        <div className="avertissements-wrapper-list">
        {avertissements.map((avertissement) => (
          <Avertissement
            key={avertissement.idAvertissement}
            avertissement={avertissement}
            users={users}
            niveaux={niveaux}
            fetchData={fetchData}
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default Avertissements;
