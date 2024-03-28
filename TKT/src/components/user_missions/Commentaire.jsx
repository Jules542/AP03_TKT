import React, { useState } from "react";

const Commentaire = ({ onSave }) => {
    const [comment, setComment] = useState("");

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSaveComment = () => {
        onSave(comment);
        setComment(""); // Réinitialise le champ de commentaire après l'enregistrement
    };

    return (
        <div className="mission-comment-container">
            <div className="mission-comment-icon" onClick={handleSaveComment}>
                <img src="public\images\comment-icon.png"></img>
            </div>
            <div className="mission-comment-textarea">
                <textarea
                    rows="4"
                    cols="50"
                    placeholder="Saisissez votre commentaire ici..."
                    value={comment}
                    onChange={handleCommentChange}
                />
                <button onClick={handleSaveComment}>Enregistrer</button>
            </div>
        </div>
    );
};

export default Commentaire;
