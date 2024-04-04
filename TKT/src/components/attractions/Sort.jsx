import React from "react";

const Sort = ({ sortItem, setSortItem }) => {
  const handleSortChange = (event) => {
    setSortItem(event.target.value);
  };
  return (
    <div className="sort__container">
      <select id="sort" value={sortItem} onChange={handleSortChange}>
        <option value="">-- Ranger par --</option>
        <option value="scaleUp">Taille (Minimale à Maximale)</option>
        <option value="scaleDown">Taille (Maximale à Minimale)</option>
      </select>
    </div>
  );
};

export default Sort;
