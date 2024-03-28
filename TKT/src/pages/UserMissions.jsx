import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Mission from "../components/user_missions/Mission";
import { UserContext } from "../context/UserContext";
import { jwtDecode } from "jwt-decode";


const UserMissions = () => {
    const [missions, setMissions] = useState([]);
    const { token } = useContext(UserContext);


    useEffect(() => {    
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        console.log(decodedToken);
        console.log("User id : " + userId);

            axios
                .get(`http://localhost:3000/missionsUser/${userId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": token,
                    },
                })          
                .then((response) => {
                    setMissions(response.data);
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
                {missions.map((mission, index) => (
                    <Mission key={index} mission={mission} />
                ))}        
            </div>
        </div>
    );
}

export default UserMissions;
