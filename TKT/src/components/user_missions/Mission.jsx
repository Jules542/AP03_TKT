import React from "react";
import Commentaire from "./Commentaire";
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
            </div>
            <div className="mission-description">
                <p>{mission.commentaire}</p>
            </div>
            <div className="mission-date">
                <p>{mission.dateMission}</p>
            </div>
            {showComment && (
                <Commentaire onSave={handleSaveComment} />
            )}
            {!showComment && (
                <div className="mission-comment-icon" onClick={toggleComment}>
                    <img src="public\images\comment-icon.png"></img>
                </div>
            )}
        </div>
    );
};

export default Mission;
