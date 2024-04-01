import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import NewUserButton from "../components/gestion_users/NewUserButton";
import Tableau from "../components/gestion_users/Tableau";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const GestionUsers = () => {

    return (
        <div>
            <h1>LISTE DES UTILISATEURS</h1>
            <NewUserButton />
            <Tableau />
        </div>
    )
}

export default GestionUsers;