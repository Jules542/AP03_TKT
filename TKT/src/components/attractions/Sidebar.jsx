import React from "react";
import Searchbar from "./Searchbar";

const Sidebar = ({
  filteredAttractions,
  setFilteredAttractions,
  searchTerm,
  setSearchTerm,
}) => {
  const handleFilterChange = (filterKey) => (event) => {
    setFilteredAttractions((prevFilter) => {
      return {
        ...prevFilter,
        [filterKey]: event.target.value,
      };
    });
  };
  return (
    <div className="sidebar">
      <div className="sidebar__title">
        <h2>Filter</h2>
      </div>
      <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="sidebar__type">
        <select onChange={(e) => handleFilterChange("attractionTypeFilter")(e)}>
          <option value="">-- Selectionner une option --</option>
          <option value="touteLaFamille">Pour toute la famille</option>
          <option value="senstationForte">Sensations fortes</option>
        </select>
      </div>
      <div className="sidebar__maximal-scale">
        <input
          type="range"
          min="0"
          max="200"
          value={filteredAttractions.maximalSize}
          onChange={(event) =>
            setFilteredAttractions({
              ...filteredAttractions,
              maximalSize: parseInt(event.target.value),
            })
          }
        />
        <span>{filteredAttractions.maximalSize}</span>
        <input
          type="checkbox"
          checked={filteredAttractions.includeAccompaniedSize}
          onChange={(event) =>
            setFilteredAttractions({
              ...filteredAttractions,
              includeAccompaniedSize: event.target.checked,
            })
          }
        />
      </div>
    </div>
  );
};

export default Sidebar;
