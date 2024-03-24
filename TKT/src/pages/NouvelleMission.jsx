import axios from "axios";
import React, { useEffect, useState } from "react";

const NouvelleMission = ({ users, attractions }) => {
  const [formData, setFormData] = useState({
    dateMission: "",
    libMission: "",
    commentaire: "",
    estTerminee: false,
    idUserMission: "",
    idAttractionMission: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/missions", formData, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
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
  }, []);

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
          users.map((user) => (
            <option key={user.idUser} value={user.idUser}>
              {user.nom} {user.prenom}
            </option>
          ))}
      </select>
      <select
        name="idAttractionMission"
        value={formData.idAttractionMission}
        onChange={handleChange}
      >
        {Array.isArray(attractions) &&
          attractions.map((attraction) => (
            <option
              key={attraction.idAttraction}
              value={attraction.idAttraction}
            >
              {attraction.nomAttraction}
            </option>
          ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default NouvelleMission;
