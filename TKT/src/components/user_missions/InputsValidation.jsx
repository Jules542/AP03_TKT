import React, { useState } from "react";

const InputsValidation = ({ onSave }) => {
    const [cochee, setCochee] = useState(false);
    const [afficherTextarea, setAfficherTextarea] = useState(false);
    const [textareaContent, setTextareaContent] = useState(null);

    const toggleCocher = () => {
        setCochee(!cochee)
        console.log(cochee);
    };

    const toggleAfficherTextarea = () => {
        setAfficherTextarea(!afficherTextarea);
    };

    const handleTextChange = (event) => {
        setTextareaContent(event.target.value)
        console.log(textareaContent);
    }

    return (
        <div className="mission-inputs-container">
            <div className="mission-checkbox-container">
                <div className="case" onClick={toggleCocher}>
                    {cochee && (
                        <div className="croix">
                        <div className="barre1"></div>
                        <div className="barre2"></div>
                        </div>
                    )}
                </div>
                Mission terminée
            </div>
            <div className="mission-comment-icon" onClick={toggleAfficherTextarea}>
                <div className="comment-icon" >
                    Ajouter un commentaire
                    <img src="public\images\comment-icon.png"></img>
                </div>
            </div>
            {afficherTextarea && (
                <div className="mission-comment-textarea">
                    <textarea
                        rows="4"
                        cols="50"
                        value={textareaContent}
                        onChange={handleTextChange}
                        placeholder="Saisissez votre commentaire ici..."
                    />
                </div>
            )}
        </div>
    );
};

export default InputsValidation;
