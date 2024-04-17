import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Mission from "../components/affectation_missions/Mission";
import { UserContext } from "../context/UserContext";

const AffectationMissions = () => {
  const [missions, setMissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [emplois, setEmplois] = useState([]);
  const { isAdmin, isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchData = () => {
    const token = localStorage.getItem("token");
    // Get attractions
    axios
      .get("http://localhost:3000/attractions", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setAttractions(response.data);
      });
    // Get users
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
    // Get missions
    axios
      .get("http://localhost:3000/missions", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
      })
      .then((response) => {
        setMissions(response.data);
      });
    // Get restaurants
    axios
      .get("http://localhost:3000/restaurants", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
      })
      .then((response) => {
        setRestaurants(response.data);
      });
    // Get equipes
    axios
      .get("http://localhost:3000/equipes", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
      })
      .then((response) => {
        setEquipes(response.data);
      });
    // Get emplois
    axios
      .get("http://localhost:3000/emplois", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
      })
      .then((response) => {
        setEmplois(response.data);
      });
  };

  useEffect(() => {
    fetchData();
    !isLoggedIn() && !isAdmin() && navigate("/");
  }, []);

  return (
    <div className="affectation__wrapper">
      <div className="affectation__header">
        <p className="affectation__indication">
          Accueil &gt; Affectation missions
        </p>
        <h1 className="affectation__title">AFFECTATION MISSIONS</h1>
      </div>
      <Link className="affectation__new" to="/affectations/nouvelle">
        Nouvelle
      </Link>
      <table className="affectation__table">
        <thead>
          <tr>
            <th>Date de la mission</th>
            <th>Libellé de la mission</th>
            <th>Commentaire</th>
            <th>Est terminée</th>
            <th>Équipe</th>
            <th>Emploi</th>
            <th>Nom de l'utilisateur</th>
            <th>Endroit de la mission</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <Mission
              key={mission.idMission}
              mission={mission}
              users={users}
              attractions={attractions}
              restaurants={restaurants}
              equipes={equipes}
              emplois={emplois}
              fetchData={fetchData}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AffectationMissions;
