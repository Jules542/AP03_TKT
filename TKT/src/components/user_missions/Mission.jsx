import React from "react";
import InputsValidation from "./InputsValidation";
import { useState } from "react";

const Mission = ({ mission, onFormChange }) => {
    const [showComment, setShowComment] = useState(false);
    const [comment, setComment] = useState("");

    const toggleComment = () => {
        setShowComment(!showComment);
    };

    const handleSaveComment = (comment) => {
        onFormChange(mission.idMission, 'commentaire', comment);
    };

    const handleToggleCocher = (isChecked) => {
        onFormChange(mission.idMission, 'estTerminee', isChecked);
    }

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
            <InputsValidation onSaveComment={handleSaveComment} onToggleCocher={handleToggleCocher} />
        </div>
    );
};

export default Mission;
