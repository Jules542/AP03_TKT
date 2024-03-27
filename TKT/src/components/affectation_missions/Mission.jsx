import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDate } from "../../utils/date";

const Mission = ({ mission, users, attractions, fetchData }) => {
  const [editing, setEditing] = useState(false);
  const [editedMission, setEditedMission] = useState(mission);

  const user = users.find((user) => user.idUser === mission.idUserMission);
  const attraction = attractions.find(
    (attraction) => attraction.idAttraction === mission.idAttractionMission
  );

  useEffect(() => {
    setEditedMission({
      ...mission,
      dateMission: new Date(mission.dateMission).toISOString().substring(0, 10),
    });
  }, [mission]);

  const handleInputChange = (event) => {
    setEditedMission({
      ...editedMission,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    const token = localStorage.getItem("token");
    event.preventDefault();
    axios
      .put(
        `http://localhost:3000/missions/${editedMission.idMission}`,
        editedMission,
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
    <div>
      <table>
        <thead>
          <tr>
            <th>Date de la mission</th>
            <th>Libellé de la mission</th>
            <th>Commentaire</th>
            <th>Est terminée</th>
            <th>Nom de l'utilisateur</th>
            <th>Nom de l'attraction</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {editing ? (
              <>
                <td>
                  <input
                    type="date"
                    value={editedMission.dateMission}
                    onChange={(e) =>
                      setEditedMission({
                        ...editedMission,
                        dateMission: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
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
                <td>
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
                <td>
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
                <td>
                  <select
                    value={editedMission.idUserMission}
                    onChange={(e) =>
                      setEditedMission({
                        ...editedMission,
                        idUserMission: e.target.value,
                      })
                    }
                  >
                    {users.map((user) => (
                      <option key={user.idUser} value={user.idUser}>
                        {user.nom} {user.prenom}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={editedMission.idAttractionMission}
                    onChange={(e) =>
                      setEditedMission({
                        ...editedMission,
                        idAttractionMission: e.target.value,
                      })
                    }
                  >
                    <option value="">Aucune</option>
                    {attractions.map((attraction) => (
                      <option
                        key={attraction.idAttraction}
                        value={attraction.idAttraction}
                      >
                        {attraction.nomAttraction}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button onClick={handleSubmit}>Save</button>
                  <button onClick={() => setEditing(false)}>Cancel</button>
                </td>
              </>
            ) : (
              <>
                <td>{formatDate(mission.dateMission)}</td>
                <td>{mission.libMission}</td>
                <td>{mission.commentaire}</td>
                <td>{mission.estTerminee ? "Oui" : "Non"}</td>
                <td>
                  {user
                    ? `${user.nom} ${user.prenom}`
                    : "Utilisateur non trouvé"}
                </td>
                <td>
                  {attraction
                    ? attraction.nomAttraction
                    : "Attraction non trouvée"}
                </td>
                <td>
                  <button onClick={() => setEditing(true)}>Edit</button>
                  <button onClick={handleDelete}>Delete</button>
                </td>
              </>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Mission;
