import React from "react";

const Searchbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="searchbar__wrapper">
      <svg
        className="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 27 27"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.87532 5.87531C3.05523 8.6954 3.05523 13.2677 5.87532 16.0878C8.69539 18.9079 13.2677 18.9079 16.0877 16.0878C18.9078 13.2677 18.9078 8.6954 16.0877 5.87531C13.2677 3.05524 8.69539 3.05524 5.87532 5.87531ZM14.2309 14.231C12.4363 16.0255 9.5267 16.0255 7.73212 14.231C5.93751 12.4363 5.93751 9.52671 7.73212 7.73212C9.5267 5.93752 12.4363 5.93752 14.2309 7.73212C16.0256 9.52671 16.0256 12.4363 14.2309 14.231Z"
        />
        <path d="M14.6951 17.4803C13.926 16.7112 13.926 15.4643 14.6951 14.6951C15.4643 13.926 16.7112 13.926 17.4803 14.6951L22.1223 19.3371C22.8914 20.1062 22.8914 21.3533 22.1223 22.1223C21.3533 22.8914 20.1062 22.8914 19.3371 22.1223L14.6951 17.4803Z" />
      </svg>
      <input
        type="text"
        value={searchTerm}
        placeholder="Rechercher une attraction..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
