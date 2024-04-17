import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const NouvelleMission = () => {
  const { token } = useContext(UserContext);
  const [missions, setMissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [emplois, setEmplois] = useState([]);

  const [formData, setFormData] = useState({
    dateMission: "",
    libMission: "",
    commentaire: "",
    estTerminee: false,
    idUserMission: "",
    idAttractionMission: attractions[0]?.idAttraction,
    idRestaurantMission: restaurants[0]?.idRestaurant,
    idEquipe: "",
    idEmploi: "",
  });

  const handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: value,
    }));
  };
  const handleTeamSelect = (e) => {
    const selectedTeam = e.target.value;
    const filteredJobs = emplois.filter(
      (emploi) => emploi.idEquipe === selectedTeam
    );
    setFormData({
      ...formData,
      idEquipe: selectedTeam,
      idEmploi: filteredJobs[0]?.id,
    });
  };

  const handleJobSelect = (e) => {
    const selectedJob = e.target.value;
    const filteredUsers = users.filter(
      (user) => user.idEmploiUser === selectedJob
    );
    setFormData({
      ...formData,
      idEmploi: selectedJob,
      idUserMission: filteredUsers[0]?.idUser,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
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

  const fetchData = () => {
    // Get attractions
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
    // Get users
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
    // Get attractions
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
    // Get restaurants
    axios
      .get("http://localhost:3000/restaurants", {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // Get equipes
    axios
      .get("http://localhost:3000/equipes", {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        setEquipes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // Get emplois
    axios
      .get("http://localhost:3000/emplois", {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        setEmplois(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchData();
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
      <select
        name="idEquipe"
        value={formData.idEquipe}
        onChange={handleTeamSelect}
      >
        <option value="">-- Sélectionner une équipe --</option>
        {equipes.map((equipe) => (
          <option key={equipe.idEquipe} value={equipe.idEquipe}>
            {equipe.nomEquipe}
          </option>
        ))}
      </select>
      <select
        name="idEmploi"
        value={formData.idEmploi}
        onChange={handleJobSelect}
      >
        <option value="">-- Sélectionner un emploi --</option>
        {emplois
          .filter(
            (emploi) => String(emploi.idEquipe) === String(formData.idEquipe)
          )
          .map((emploi) => (
            <option key={emploi.id} value={emploi.id}>
              {emploi.nomEmploi}
            </option>
          ))}
      </select>
      <select
        name="idUserMission"
        value={formData.idUserMission}
        onChange={handleChange}
      >
        <option value="">-- Sélectionner un utilisateur --</option>
        {users
          .filter((user) => String(user.idEmploiUser) === formData.idEmploi)
          .map((user) => (
            <option key={user.idUser} value={user.idUser}>
              {user.nom} {user.prenom}
            </option>
          ))}
      </select>
      {formData.idEquipe === "1" && (
        <select
          name="idAttractionMission"
          value={formData.idAttractionMission}
          onChange={handleChange}
        >
          <option value="0">-- Selectionner une attraction </option>
          {attractions &&
            Array.isArray(attractions) &&
            attractions.map((attraction, index) => (
              <option key={index} value={attraction.idAttraction}>
                {attraction.nomAttraction}
              </option>
            ))}
        </select>
      )}
      {formData.idEquipe === "3" && (
        <select
          name="idRestaurantMission"
          value={formData.idRestaurantMission}
          onChange={handleChange}
        >
          <option value="">-- Selectionner un restaurant --</option>
          {restaurants &&
            Array.isArray(restaurants) &&
            restaurants.map((restaurant, index) => (
              <option key={index} value={restaurant.id}>
                {restaurant.nomRestaurant}
              </option>
            ))}
        </select>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default NouvelleMission;
