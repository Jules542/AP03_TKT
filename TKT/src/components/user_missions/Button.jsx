import React from "react";

const Button = ({ sendDataToAPI }) => 
{
    return (
        <div className="button-container">
            <button onClick={sendDataToAPI}>Valider</button>
        </div>
    );
};

export default Button;
