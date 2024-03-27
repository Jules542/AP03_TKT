import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const NouvelleMission = () => {
  const { token } = useContext(UserContext);
  const [missions, setMissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [formData, setFormData] = useState({
    dateMission: "",
    libMission: "",
    commentaire: "",
    estTerminee: false,
    idUserMission: users[0]?.idUser,
    idAttractionMission: attractions[0]?.idAttraction,
  });
  const handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/missions", formData, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

    axios
      .get("http://localhost:3000/users", {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://localhost:3000/attractions", {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        setAttractions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log("coucou", attractions);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        name="dateMission"
        value={formData.dateMission}
        onChange={handleChange}
      />
      <input
        type="text"
        name="libMission"
        value={formData.libMission}
        onChange={handleChange}
      />
      <textarea
        name="commentaire"
        value={formData.commentaire}
        onChange={handleChange}
      />
      <input
        type="checkbox"
        name="estTerminee"
        checked={formData.estTerminee}
        onChange={handleChange}
      />
      <select
        name="idUserMission"
        value={formData.idUserMission}
        onChange={handleChange}
      >
        {Array.isArray(users) &&
          users.map((user, index) => (
            <option key={index} value={user.idUser}>
              {user.nom} {user.prenom}
            </option>
          ))}
      </select>
      <select
        name="idAttractionMission"
        value={formData.idAttractionMission}
        onChange={handleChange}
      >
        <option value="0">-- Selectionner une attraction </option>
        {Array.isArray(attractions) &&
          attractions.map((attraction, index) => (
            <option key={index} value={attraction.idAttraction}>
              {attraction.nomAttraction}
            </option>
          ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default NouvelleMission;
