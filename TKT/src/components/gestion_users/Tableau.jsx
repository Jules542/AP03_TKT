import React, { useContext, useEffect, useState } from "react";
import ActionIcons from "./ActionIcons";
import axios from "axios";

const Tableau = () => {
    const [usersList, setUserList] = useState([]);
    const [showAdmins, setShowAdmins] = useState(false);


    useEffect(() => {    
        const deleteUser = (idUser) => {
            setUserList(prevUsers => prevUsers.filter(user => user.id !== idUser))
        }

        const token = localStorage.getItem("token");

        axios
          .get("http://localhost:3000/users", {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": `${token}`,
              },
          })
          .then((response) => {
            const filteredUsers = response.data.filter(user => showAdmins || user.isAdmin === 0);
            setUserList(filteredUsers);
          })
          .catch((error) => {
            console.error(
              "Une erreur est survenue lors de la récupération des données",
              error
            );
          });
      }, [showAdmins]);

      // Fonction pour supprimer un utilisateur
    const handleDeleteUser = (idUser) => {
        const token = localStorage.getItem("token");

        axios.delete(`http://localhost:3000/user/${idUser}`, {
        headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`,
            },
          })
            .then(() => {
                // Met à jour la liste des utilisateurs après la suppression réussie
                setUserList(prevUsers => prevUsers.filter(user => user.idUser !== idUser));
            })
            .catch(error => {
                console.error("Une erreur est survenue lors de la suppression de l'utilisateur", error);
            });
    };

      return (
        <div className="tableau">
            <div className="checkbox-container">
                <input type="checkbox" onChange={() => setShowAdmins(!showAdmins)} />
                <p>Afficher les administrateurs</p>
            </div>
            <div className="tableau-container">
                <table>
                    <thead>
                        <tr>
                            <th>Identifiant</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Rôle</th>
                            <th>Équipe</th>
                            <th>Nombre de missions du jour</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList.map((user) => (
                            <tr key={user.idUser}>
                                <td>{user.idUser}</td>
                                <td>{user.nom}</td>
                                <td>{user.prenom}</td>
                                <td>{user.isAdmin === 1 ? 'Administrateur' : 'Utilisateur'}</td>
                                <td>{user.nomEquipe !== null ? user.nomEquipe : 'Aucune équipe'}</td>
                                <td>{user.nbMissions}</td>
                                {/* Afficher les icônes uniquement pour les utilisateurs non-administrateurs */}
                                <td>{user.isAdmin === 0 && <ActionIcons idUser={user.idUser} onDelete={handleDeleteUser} />}</td>                            
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )
}

export default Tableau;