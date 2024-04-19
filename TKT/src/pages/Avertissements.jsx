import axios from "axios";
import React, { useEffect, useState } from "react";
import Avertissement from "../components/avertissements/Avertissement";
import { Link } from "react-router-dom";

const Avertissements = () => {
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
      .get("http://localhost:3000/users", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      });
    axios
      .get("http://localhost:3000/avertissements", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
      })
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
        <Link to="/avertissements/nouveau" className="avertissement-new">Nouvelle</Link>
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
