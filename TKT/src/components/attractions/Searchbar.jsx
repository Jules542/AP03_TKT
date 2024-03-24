import React from "react";

const Searchbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="searchbar__wrapper">
      <input
        type="text"
        value={searchTerm}
        placeholder="Rechercher une attraction"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
