import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDate } from "../../utils/date";
import BackIcon from "../common/icons/BackIcon";
import CheckIcon from "../common/icons/CheckIcon";
import CloseIcon from "../common/icons/CloseIcon";
import EditIcon from "../common/icons/EditIcon";

const Mission = ({
  mission,
  users,
  attractions,
  fetchData,
  equipes,
  restaurants,
  emplois,
}) => {
  const [editing, setEditing] = useState(false);
  const [editedMission, setEditedMission] = useState(mission);
  const user = users.find((user) => user.idUser === mission.idUserMission);
  const attraction = attractions.find(
    (attraction) => attraction.idAttraction === mission.idAttractionMission
  );
  const restaurant = restaurants.find(
    (restaurant) => restaurant.idRestaurant === mission.idRestaurantMission
  );
  let emploi;
  if (user) {
    emploi = emplois.find((emploi) => emploi.id === user.idEmploiUser);
  }
  let equipe;
  if (emploi) {
    equipe = equipes.find((equipe) => equipe?.idEquipe === emploi.idEquipe);
  }

  useEffect(() => {
    const currentEquipe =
      emplois.find((emploi) => emploi.id === user.idEmploiUser)?.idEquipe || "";
    let currentEmploiUser;
    if (user) {
      currentEmploiUser = user.idEmploiUser || "";
    }
    const currentIdUserMission = mission.idUserMission || "";
    const currentIdRestaurantMission = mission.idRestaurantMission || null;
    const currentIdAttractionMission = mission.idAttractionMission || null;

    setEditedMission((prevState) => ({
      ...prevState,
      dateMission: new Date(mission.dateMission).toISOString().substring(0, 10),
      idEquipe: currentEquipe,
      idEmploiUser: currentEmploiUser,
      idUserMission: currentIdUserMission,
      idRestaurantMission: currentIdRestaurantMission,
      idAttractionMission: currentIdAttractionMission,
    }));
  }, [mission, user, emplois]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    console.log(editedMission);

    const updatedMission = {
      ...editedMission,
      idRestaurantMission: Number(editedMission.idRestaurantMission) || null,
      idAttractionMission: Number(editedMission.idAttractionMission) || null,
    };

    axios
      .put(
        `http://localhost:3000/missions/${updatedMission.idMission}`,
        updatedMission,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`,
          },
        }
      )
      .then(() => {
        fetchData();
      });
    setEditing(false);
  };

  const handleDelete = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3000/missions/${mission.idMission}`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
      })
      .then(() => {
        fetchData();
      });
  };

  return (
    <>
      <tr>
        {editing ? (
          <>
            <td data-label="Date">
              <input
                type="date"
                value={formatDate(editedMission.dateMission)}
                onChange={(e) =>
                  setEditedMission({
                    ...editedMission,
                    dateMission: e.target.value,
                  })
                }
              />
            </td>
            <td data-label="Mission">
              <input
                type="text"
                value={editedMission.libMission}
                onChange={(e) =>
                  setEditedMission({
                    ...editedMission,
                    libMission: e.target.value,
                  })
                }
              />
            </td>
            <td data-label="Commentaire">
              <input
                type="text"
                value={editedMission.commentaire}
                onChange={(e) =>
                  setEditedMission({
                    ...editedMission,
                    commentaire: e.target.value,
                  })
                }
              />
            </td>
            <td data-label="Est terminé">
              <input
                type="checkbox"
                checked={editedMission.estTerminee}
                onChange={(e) =>
                  setEditedMission({
                    ...editedMission,
                    estTerminee: e.target.checked,
                  })
                }
              />
            </td>
            <td data-label="Équipe">
              <select
                value={
                  isNaN(editedMission.idEquipe) ? "" : editedMission.idEquipe
                }
                onChange={(e) => {
                  const newIdEquipe = Number(e.target.value);
                  setEditedMission({
                    ...editedMission,
                    idEquipe: newIdEquipe,
                    idEmploiUser:
                      emplois.find((emploi) => emploi.idEquipe === newIdEquipe)
                        ?.id || "",
                    idUserMission: "",
                    idRestaurantMission: null,
                    idAttractionMission: null,
                  });
                }}
              >
                <option value="">-- Sélectionner une équipe --</option>
                {equipes.map((equipe) => (
                  <option key={equipe.idEquipe} value={equipe.idEquipe}>
                    {equipe.nomEquipe}
                  </option>
                ))}
              </select>
            </td>
            <td data-label="Emploi">
              <select
                value={editedMission.idEmploiUser}
                onChange={(e) =>
                  setEditedMission({
                    ...editedMission,
                    idEmploiUser: Number(e.target.value),
                    idUserMission: "",
                  })
                }
              >
                <option value="">-- Sélectionner un emploi --</option>
                {emplois
                  .filter(
                    (emploi) => emploi.idEquipe === editedMission.idEquipe
                  )
                  .map((emploi) => (
                    <option key={emploi.id} value={emploi.id}>
                      {emploi.nomEmploi}
                    </option>
                  ))}
              </select>
            </td>
            <td data-label="Utilisateur">
              <select
                value={editedMission.idUserMission}
                onChange={(e) =>
                  setEditedMission({
                    ...editedMission,
                    idUserMission: Number(e.target.value),
                  })
                }
              >
                <option value="">-- Sélectionner un utilisateur --</option>
                {users
                  .filter(
                    (user) => user.idEmploiUser === editedMission.idEmploiUser
                  )
                  .map((user) => (
                    <option key={user.idUser} value={user.idUser}>
                      {user.nom} {user.prenom}
                    </option>
                  ))}
              </select>
            </td>
            <td data-label="Lieu">
              {editedMission && editedMission.idEquipe === 3 && (
                <select
                  value={
                    editedMission.idRestaurantMission === null ||
                    isNaN(editedMission.idRestaurantMission)
                      ? ""
                      : editedMission.idRestaurantMission
                  }
                  onChange={(e) => {
                    const newValue = e.target.value
                      ? Number(e.target.value)
                      : null;
                    setEditedMission((prevState) => ({
                      ...prevState,
                      idRestaurantMission: newValue,
                    }));
                  }}
                >
                  <option value="">-- Sélectionner un restaurant --</option>
                  {restaurants.map((restaurant) => (
                    <option key={restaurant.id} value={restaurant.id}>
                      {restaurant.nomRestaurant}
                    </option>
                  ))}
                </select>
              )}
              {editedMission && editedMission.idEquipe === 1 && (
                <select
                  value={
                    editedMission.idAttractionMission === null ||
                    isNaN(editedMission.idAttractionMission)
                      ? ""
                      : editedMission.idAttractionMission
                  }
                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    setEditedMission((prevState) => ({
                      ...prevState,
                      idAttractionMission: newValue,
                    }));
                  }}
                >
                  <option value="">-- Sélectionner une attraction --</option>
                  {attractions.map((attraction) => (
                    <option
                      key={attraction.idAttraction}
                      value={attraction.idAttraction}
                    >
                      {attraction.nomAttraction}
                    </option>
                  ))}
                </select>
              )}
            </td>
            <td className="mission__actions" data-label="Actions">
              <div>
                <a onClick={handleSubmit}>
                  <CheckIcon />
                </a>
                <a onClick={() => setEditing(false)}>
                  <BackIcon />
                </a>
              </div>
            </td>
          </>
        ) : (
          <>
            <td className="mission__first" data-label="Date">
              {formatDate(mission.dateMission)}
            </td>
            <td data-label="Mission">{mission.libMission}</td>
            <td data-label="Commentaire">{mission.commentaire}</td>
            <td data-label="Est terminé">
              {mission.estTerminee ? "Oui" : "Non"}
            </td>
            <td data-label="Équipe">
              {equipe ? equipe?.nomEquipe : "Équipe non trouvée"}
            </td>
            <td data-label="Emploi">
              {emploi ? emploi?.nomEmploi : "Emploi non trouvé"}
            </td>
            <td data-label="Utilisateur">
              {user ? `${user.nom} ${user.prenom}` : "Utilisateur non trouvé"}
            </td>
            <td data-label="Endroit">
              {attraction
                ? attraction.nomAttraction
                : restaurant
                ? restaurant.nomRestaurant
                : ""}
            </td>
            <td data-label="Actions" className="mission__actions">
              <div>
                <a onClick={() => setEditing(true)}>
                  <EditIcon />
                </a>
                <a onClick={handleDelete}>
                  <CloseIcon />
                </a>
              </div>
            </td>
          </>
        )}
      </tr>
    </>
  );
};

export default Mission;
