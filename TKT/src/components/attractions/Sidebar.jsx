import React from "react";

const Sidebar = ({ filteredAttractions, setFilteredAttractions }) => {
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
      <div className="sidebar__content">
        <div className="sidebar__type">
          <h5>Type d'attraction</h5>
          <select
            onChange={(e) => handleFilterChange("attractionTypeFilter")(e)}
          >
            <option value="">-- Selectionner une option --</option>
            <option value="touteLaFamille">Pour toute la famille</option>
            <option value="senstationForte">Sensations fortes</option>
          </select>
        </div>
        <div className="sidebar__maximal-scale">
          <h5>Taille</h5>
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
          <span>{filteredAttractions.maximalSize}cm</span>
          <div className="sidebar__is-accompagnated">
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
            <h4>Accompagné d'un adulte</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
