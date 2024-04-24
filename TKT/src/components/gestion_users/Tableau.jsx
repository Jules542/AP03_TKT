import React, { useContext, useEffect, useState } from "react";
import ActionIcons from "./ActionIcons";
import axios from "axios";

const Tableau = (users) => {
    const [equipes, setEquipes] = useState([]);
    const [equipeId, setEquipeId] = useState(0);
    const [usersList, setUserList] = useState([]);
    const [showAdmins, setShowAdmins] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(null);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        // Charger la liste des équipes disponibles depuis votre API lors du montage du composant
        axios.get("http://localhost:3000/emplois", {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": `${token}`,
              },
          })
            .then(response => {
                setEquipes(response.data);
            })
            .catch(error => {
                console.error("Une erreur est survenue lors du chargement des équipes", error);
            });
    }, []);


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

    const handleEditUser = (user) => {
        setEditing(true);
        setEditingUser(user);
        setEditedUser({
            idUser: user.idUser,
            nom: user.nom,
            prenom: user.prenom,
            idEmploiUser: user.idEmploiUser,
        });
        console.log(user);
    }

    const handleCancelEdit = () => {
        setEditing(false);
        setEditingUser(null);
    }

    const handleConfirmEdit = (event) => {
        console.log(editedUser);
        const token = localStorage.getItem("token");
        event.preventDefault();
        axios
        .put(
            `http://localhost:3000/user/${editedUser.idUser}`,
            editedUser,
            {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": `${token}`,
            },
            }
        )
        .then(() => {
            refreshUserList();
        });
        setEditing(false);
        setEditingUser(null);
    };

    // Fonction pour rafraîchir la liste des utilisateurs
    const refreshUserList = () => {
        const token = localStorage.getItem("token");
        axios
            .get("http://localhost:3000/users", {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token,
                },
            })
            .then((response) => {
                const filteredUsers = response.data.filter(user => showAdmins || user.isAdmin === 0);
                setUserList(filteredUsers);
            })
            .catch((error) => {
                console.error("Une erreur est survenue lors de la récupération des données", error);
            });
    };


      return (
        <div className="tableau-listeusers">
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
                            <th className="equipe-column">Emploi</th>
                            <th className="nb-mission-column">Nombre de missions du jour</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList.map((user) => (
                            <tr key={user.idUser}>
                                {editing && editingUser && editingUser.idUser === user.idUser ? (
                                    <>
                                    <td>
                                        {user.idUser}
                                    </td>
                                    <td>
                                        <input type="text" value={editedUser.nom} onChange={(e) => setEditedUser({ ...editedUser, nom: e.target.value,})}></input>
                                    </td>
                                    <td>
                                        <input type="text" value={editedUser.prenom} onChange={(e) => setEditedUser({ ...editedUser, prenom: e.target.value,})}></input>
                                    </td>
                                    <td>
                                        {user.isAdmin === 1 ? 'Administrateur' : 'Utilisateur'}
                                        </td>
                                    <td>
                                        <select
                                            value={editedUser.idEmploiUser}
                                            onChange={(e) =>
                                            setEditedUser({
                                                ...editedUser,
                                                idEmploiUser: e.target.value,
                                            })
                                            }
                                        >
                                            <option key="0" value="0">Aucune équipe</option>
                                            {equipes.map((equipe) => (
                                            <option key={equipe.nomEmploi} value={equipe.id}>
                                                {equipe.nomEmploi}
                                            </option>
                                            ))}
                                        </select>                                    
                                    </td>
                                    <td>
                                        {user.nbMissions}
                                    </td>
                                    <td className="icon-column">
                                        <div className="validation-icons">
                                            <img onClick={handleConfirmEdit} src="https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-part-2/512/apply_ok_check_yes_dialog-512.png"></img>
                                            <img onClick={handleCancelEdit} src="https://cdn4.iconfinder.com/data/icons/flat-icons-for-web-and-seo/342/12-256.png"></img>
                                        </div>
                                    </td>
                                    </>
                                ) : (
                                <>               
                                <td>{user.idUser}</td>
                                <td>{user.nom}</td>
                                <td>{user.prenom}</td>
                                <td>{user.isAdmin === 1 ? 'Administrateur' : 'Utilisateur'}</td>
                                <td>{user.nomEmploi !== null ? user.nomEmploi : 'Aucun Emploi'}</td>
                                <td>{user.nbMissions}</td>
                                {/* Afficher les icônes uniquement pour les utilisateurs non-administrateurs */}
                                <td className="icon-column">{user.isAdmin === 0 && <ActionIcons idUser={user.idUser} onEdit={() => handleEditUser(user)} onDelete={handleDeleteUser} />}</td>  
                                </>   
                                )}                       
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )
}

export default Tableau;