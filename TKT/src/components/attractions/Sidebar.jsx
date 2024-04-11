import CloseButton from "../common/Buttons";
import Sort from "./Sort";

const SidebarContent = ({
  filteredAttractions,
  setFilteredAttractions,
  switchOffSidebar,
  handleFilterClick,
  sortItem,
  setSortItem,
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
    <div className="sidebar__content">
      <div className="sidebar__type">
        <div className="sidebar__header">
          <h5>Type d'attraction</h5>
          {switchOffSidebar ? (
            <CloseButton
              someFunction={handleFilterClick}
              className="sidebar__close-button"
            >
              <svg
                fill="#000000"
                height="800px"
                width="800px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 1792 1792"
                xmlSpace="preserve"
              >
                <path
                  d="M1082.2,896.6l410.2-410c51.5-51.5,51.5-134.6,0-186.1s-134.6-51.5-186.1,0l-410.2,410L486,300.4
	c-51.5-51.5-134.6-51.5-186.1,0s-51.5,134.6,0,186.1l410.2,410l-410.2,410c-51.5,51.5-51.5,134.6,0,186.1
	c51.6,51.5,135,51.5,186.1,0l410.2-410l410.2,410c51.5,51.5,134.6,51.5,186.1,0c51.1-51.5,51.1-134.6-0.5-186.2L1082.2,896.6z"
                />
              </svg>
            </CloseButton>
          ) : null}
        </div>
        <select onChange={(e) => handleFilterChange("attractionTypeFilter")(e)}>
          <option value="">-- Selectionner une option --</option>
          <option value="touteLaFamille">Pour toute la famille</option>
          <option value="sensationForte">Sensations fortes</option>
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
        {switchOffSidebar ? (
          <Sort sortItem={sortItem} setSortItem={setSortItem} />
        ) : null}
      </div>
    </div>
  );
};

const Sidebar = ({
  filteredAttractions,
  setFilteredAttractions,
  switchOffSidebar,
  swapSidebarClass,
  handleFilterClick,
  sortItem,
  setSortItem,
}) => {
  return (
    <>
      <div
        className={`${
          !switchOffSidebar || swapSidebarClass ? "sidebar" : "sidebar__hidden"
        } ${swapSidebarClass ? "sidebar__mobile-on" : ""}`}
      >
        {!switchOffSidebar && (
          <div className="sidebar__title">
            <h2>Filter</h2>
          </div>
        )}
        <SidebarContent
          sortItem={sortItem}
          setSortItem={setSortItem}
          switchOffSidebar={switchOffSidebar}
          handleFilterClick={handleFilterClick}
          filteredAttractions={filteredAttractions}
          setFilteredAttractions={setFilteredAttractions}
        />
      </div>
    </>
  );
};

export default Sidebar;
