import React from "react";

const Attraction = ({ attraction }) => {
  return (
    <div className="attraction__container">
      <h2>{attraction.nomAttraction}</h2>
      <p>{attraction.tailleMinRequise}</p>
      <p>{attraction.tailleMinRequiseAccomp}</p>
      <p>{attraction.touteLaFamille}</p>
      <p>{attraction.senstationForte}</p>
      <p>{attraction.libelle}</p>
    </div>
  );
};

export default Attraction;
