import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Mission from "../components/affectation_missions/Mission";

const AffectationMissions = () => {
  const [missions, setMissions] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/missions", {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        setMissions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      AffectationMissions
      <li>
        <Link to="/affectations/nouvelle">New</Link>
      </li>
      {Array.isArray(missions) &&
        missions.map((mission) => (
          <Mission key={mission.idMission} mission={mission} />
        ))}
    </div>
  );
};

export default AffectationMissions;
