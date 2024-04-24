import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const NewUserPage = () => {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [emplois, setEmplois] = useState([]);
    const [emploiId, setEmploiId] = useState(0);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true); // État pour indiquer si les mots de passe correspondent
    const [inputsFilled, setInputsFilled] = useState(true); // État pour indiquer si tous les champs sont remplis
    const navigate = useNavigate();

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
                setEmplois(response.data);
            })
            .catch(error => {
                console.error("Une erreur est survenue lors du chargement des emplois", error);
            });
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Vérifier si tous les champs requis sont remplis
        if (!nom || !prenom || !emploiId || !login || !password || !confirmPassword) {
            setInputsFilled(false);
            setPasswordsMatch(true); // Réinitialiser l'état des mots de passe correspondants
            return;
        }

        // Vérifier si les mots de passe correspondent
        if (password !== confirmPassword) {
            setInputsFilled(true); // Réinitialiser l'état des champs remplis
            setPasswordsMatch(false);
            return;
        }

        // Réinitialiser les états des messages d'erreur
        setInputsFilled(true);
        setPasswordsMatch(true);

        // Créer un nouvel utilisateur avec les données du formulaire
        const newUser = {
            nom,
            prenom,
            emploiId,
            login,
            password,
        };

        const token = localStorage.getItem("token");

        try {
            // Envoyer les données du formulaire à votre API pour créer un nouvel utilisateur
            const response = await axios.post("http://localhost:3000/register", newUser, {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": `${token}`,
                  },
              });
            console.log(response);
            window.alert(`L'utilisateur ${newUser.nom} ${newUser.prenom} a été ajouté. Vous allez être redirigé vers la liste.`);
            navigate("/gestion-utilisateurs");
        } catch (error) {
            console.error("Une erreur est survenue lors de la création du nouvel utilisateur", error);
        }
    };

    return (
    <div className="newuserform-container">
        <h1>Création d'un nouvel utilisateur</h1>
        <div className="newuserform">
            <form onSubmit={handleFormSubmit}>
                <label>
                    Nom :
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required placeholder="Saisir le nom..." />
                </label>
                <label>
                    Prénom :
                    <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} required placeholder="Saisir le prénom..." />
                </label>
                <label>
                    Emploi :
                    <select value={emploiId} onChange={(e) => setEmploiId(e.target.value)} required>
                        <option value="">Sélectionnez un emploi</option>
                        {emplois.map(emploi => (
                            <option key={emploi.id} value={emploi.id}>{emploi.nomEmploi}</option>
                        ))}
                    </select>
                </label>
                <label>Login :
                    <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} required placeholder="Saisir le login..."/>
                </label>
                <label>Password :
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Saisir le mot de passe..."/>
                </label>
                <label>
                    Confirm Password :
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Confirmer le mot de passe..."/>
                </label>
                {!inputsFilled && <p style={{ color: "red" }}>Veuillez remplir tous les champs</p>}
                {!passwordsMatch && <p style={{ color: "red" }}>Les mots de passe ne correspondent pas</p>}
                <button onClick={handleFormSubmit} type="submit">Ajouter le nouvel utilisateur</button>
            </form>
        </div>
    </div>
    )
}


export default NewUserPage;