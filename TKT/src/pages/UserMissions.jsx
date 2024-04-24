import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Mission from "../components/user_missions/Mission";
import Button from "../components/user_missions/Button";
import { UserContext } from "../context/UserContext";
import { jwtDecode } from "jwt-decode";

const UserMissions = () => {
    const [missions, setMissions] = useState([]);
    const { token } = useContext(UserContext);
    const [formData, setFormData] = useState({}); // Utilisez un objet pour stocker les données de toutes les missions

    const handleFormChange = (missionId, key, value) => {
        // Mettre à jour l'état avec les données de chaque mission
        setFormData(prevState => ({
            ...prevState,
            [missionId]: {
                ...prevState[missionId],
                [key]: value
            }
        }));
    };

    const sendDataToAPI = () => {
        // Effectuer la requête HTTP POST vers votre API avec toutes les données
        axios.put("http://localhost:3000/missionsUser", formData, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
            },
        })
            .then(response => {
                console.log("Data sent successfully:", response.data);
                window.alert("Les données ont été envoyées avec succès.");
                window.location.reload(); // Rechargement de la page après l'envoi des données
            })
            .catch(error => {
                console.error("Error sending data:", error);
            });
    };

    useEffect(() => {    
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

            axios.get(`http://localhost:3000/missionsUser/${userId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": token,
                    },
                })          
                .then((response) => {
                    setMissions(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(
                        "Une erreur est survenue lors de la récupération des données",
                        error
                    );
                });
        }, []); // Exécuter l'effet lorsque userId change

    return (
        <div className="missions-OTD">
            <h1><strong>Vos</strong> missions :</h1>
            <div className="mission-list">
                {missions.length === 0 ? (
                    <p>Aucune mission disponible pour le moment.</p>
                ) : (
                    missions.map((mission, index) => (
                        <Mission key={index} mission={mission} onFormChange={handleFormChange} />
                    ))
                )}      
            </div>
            <Button sendDataToAPI={sendDataToAPI} />
        </div>
    );
}

export default UserMissions;
