import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewUserButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        //Naviguer sur la page du formulaire d'ajout
        navigate('/gestion-utilisateurs/new');
    }

    return (
        <div className="newuserbutton-container">
            <button onClick={handleClick}>Créer un utilisateur</button>
        </div>
    )
}

export default NewUserButton;
