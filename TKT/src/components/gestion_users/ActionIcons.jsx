import React, { useContext, useEffect, useState } from "react";
import axios from "axios";


const ActionIcons = ({idUser, onDelete, onEdit}) => {

    const handleDelete = () => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
        if (confirmDelete) {
            onDelete(idUser);
        };
    };

    const handleEdit = () => {
        onEdit(idUser);
    }


    return (
        <div className="action-icons-container">
            <img onClick={handleEdit} className="edit-icon" src="https://cdn-icons-png.freepik.com/256/13424/13424065.png" alt="Modify"></img>
            <img onClick={handleDelete} className="delete-icon" src="https://cdn-icons-png.freepik.com/256/6861/6861362.png" alt="Delete"></img>
        </div>
    )
}
export default ActionIcons;