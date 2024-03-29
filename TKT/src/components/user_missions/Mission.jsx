import React from "react";
import InputsValidation from "./InputsValidation";
import { useState } from "react";

const Mission = ({ mission }) => {
    const [showComment, setShowComment] = useState(false);
    const [comment, setComment] = useState("");

    const toggleComment = () => {
        setShowComment(!showComment);
    };

    const handleSaveComment = (comment) => {
        console.log("Comment saved:", comment);
        setComment(comment);
        setShowComment(false); // Ferme la zone de commentaire après l'enregistrement
    };

    return (
        <div className="mission-container">
            <div className="mission-title">
                <h2>{mission.libMission}</h2>
                <div className="mission-importance">
                    {mission.libImportance}
                </div>
            </div>
            <div className="mission-description">
                <p>{mission.commentaire}</p>
            </div>
            <div className="mission-date">
                <p>{mission.dateMission}</p>
            </div>
            <InputsValidation />
        </div>
    );
};

export default Mission;
