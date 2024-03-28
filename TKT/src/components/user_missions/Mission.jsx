import React from "react";

const Mission = ({mission}) => 
{
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
        </div>
    );
};

export default Mission;
