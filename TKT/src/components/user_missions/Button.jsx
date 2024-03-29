import React, { useState } from "react";
import axios from "axios";

const Button = () => 
{
    const [dataToSend, setDataToSend] = useState({});

    // Fonction de gestion d'événement qui envoie les données à l'API
    const sendDataToAPI = () => {
        // Effectuer la requête HTTP POST vers votre API
        axios.put("/missionsUser", dataToSend)
            .then(response => {
                console.log("Data sent successfully:", response.data);
                // Vous pouvez ajouter ici d'autres actions après l'envoi des données
            })
            .catch(error => {
                console.error("Error sending data:", error);
                // Gérer les erreurs de l'envoi des données
            });
    };


    return (
        <div className="button-container">
            <button onClick={sendDataToAPI}>Valider</button>
        </div>
    );
};

export default Button;
