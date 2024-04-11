import React, { useState } from "react";
import CloseButton from "../common/Buttons";
import AccompagnatedIcon from "../common/icons/AccompagnatedIcon";
import CloseIcon from "../common/icons/CloseIcon";
import FamilyIcon from "../common/icons/FamilyIcon";
import LightningIcon from "../common/icons/LightningIcon";
import PersonIcon from "../common/icons/PersonIcon";

const Attraction = ({ attraction }) => {
  const [showDetails, setShowDetails] = useState(false);
  const handleButtonClick = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div className="attraction__container">
      <img src={attraction.imageAttraction} alt="" />
      <div className="attraction__details">
        <div className="attraction__header">
          <h2>{attraction.nomAttraction}</h2>
          <div className="attraction__requirements">
            <PersonIcon />
            <p>{attraction.tailleMinRequise}</p>
          </div>
        </div>
        <p className="attraction__description">{attraction.descAttraction}</p>
        {showDetails && (
          <div className="attraction__dialog">
            <div className="attraction__dialog-container">
              <div className="attraction__dialog-common attraction__dialog-left">
                <img src={attraction.imageAttraction} alt="" />
              </div>
              <div className="attraction__dialog-common attraction__dialog-right">
                <div className="attraction__dialog-header">
                  <h1>{attraction.nomAttraction}</h1>
                  <CloseButton someFunction={handleButtonClick}>
                    <CloseIcon />
                  </CloseButton>
                </div>
                <p className="attraction__dialog-desc">
                  {attraction.descAttraction}
                </p>
                <div className="attraction__dialog-scale">
                  <div>
                    <PersonIcon />
                    <p>{attraction.tailleMinRequise}cm</p>
                  </div>
                  {attraction.tailleMinRequiseAccomp && (
                    <div>
                      <AccompagnatedIcon />
                      <p>{attraction.tailleMinRequiseAccomp}cm</p>
                    </div>
                  )}
                  {attraction.touteLaFamille == 1 ? (
                    <div>
                      <FamilyIcon />
                      <p>Toute la famille</p>
                    </div>
                  ) : null}
                  {attraction.sensationForte == 1 ? (
                    <div>
                      <LightningIcon />
                      <p>Sensation forte</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}
        <button className="attraction__more-info" onClick={handleButtonClick}>
          En savoir plus
        </button>
      </div>
    </div>
  );
};

export default Attraction;
