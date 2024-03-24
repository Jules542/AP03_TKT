import React from "react";

const Mission = ({ mission }) => {
  return (
    <div>
      <h2>{mission.libMission}</h2>
      <p>{mission.commentaire}</p>
      <p>Date: {mission.dateMission}</p>
      <p>Est terminée: {mission.estTerminee ? "Oui" : "Non"}</p>
      <p>Attraction: {mission.nomAttraction}</p>
      <p>
        Affecté à: {mission.nom} {mission.prenom}
      </p>
    </div>
  );
};

export default Mission;
