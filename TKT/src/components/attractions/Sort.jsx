import React from "react";

const Sort = ({
  sortItem,
  setSortItem,
  handleFilterClick,
  switchOffSidebar,
}) => {
  const handleSortChange = (event) => {
    setSortItem(event.target.value);
  };

  return (
    <>
      {switchOffSidebar ? (
        <div className="sort__filter">
          <a onClick={handleFilterClick}>Filter</a>
        </div>
      ) : (
        <div
          className={
            window.innerWidth > 768
              ? "sort__container"
              : "sort__container sort__container-mobile"
          }
        >
          <select id="sort" value={sortItem} onChange={handleSortChange}>
            <option value="">-- Ranger par --</option>
            <option value="scaleUp">Taille (Minimale à Maximale)</option>
            <option value="scaleDown">Taille (Maximale à Minimale)</option>
          </select>
        </div>
      )}
    </>
  );
};

export default Sort;
