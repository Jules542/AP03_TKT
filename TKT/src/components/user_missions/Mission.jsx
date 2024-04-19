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
            <div className="mission">
                <div className="mission-title">
                    <h2>{mission.libMission}</h2>
                </div>
                <div className="mission-details">
                    <div className="mission-description">
                        <p>Description : {mission.commentaire}</p>
                    </div>
                    {mission.nomAttraction && (
                    <div className="mission-attraction">
                        <p>Attraction concernée : {mission.nomAttraction}</p>
                    </div>
                    )}
                    {mission.nomRestaurant && (
                        <div className="mission-restaurant">
                            <p>Restaurant concerné : {mission.nomRestaurant}</p>
                        </div>
                    )}
                    <div className="mission-date">
                        <p>Date : {mission.dateMission.split('T')[0]}</p> {/* Récupère seulement la date */}
                    </div>
                </div>
            </div>                
            <InputsValidation onSaveComment={handleSaveComment} onToggleCocher={handleToggleCocher} />
        </div>
    );
};

export default Mission;
