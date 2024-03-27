import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Mission from "../components/affectation_missions/Mission";

const AffectationMissions = () => {
  const [missions, setMissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [attractions, setAttractions] = useState([]);

  const fetchData = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/attractions", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setAttractions(response.data);
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
      .get("http://localhost:3000/missions", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
      })
      .then((response) => {
        setMissions(response.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Link to="/affectations/nouvelle">Nouvelle</Link>
      {missions.map((mission) => (
        <Mission
          key={mission.idMission}
          mission={mission}
          users={users}
          attractions={attractions}
          fetchData={fetchData}
        />
      ))}
    </div>
  );
};

export default AffectationMissions;
