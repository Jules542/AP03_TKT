import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Attraction from "../components/attractions/Attraction";
import Searchbar from "../components/attractions/Searchbar";
import Sidebar from "../components/attractions/Sidebar";
import Sort from "../components/attractions/Sort";

const Attractions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [attractions, setAttractions] = useState([]);
  const [sortItem, setSortItem] = useState("");
  const [filteredAttractions, setFilteredAttractions] = useState({
    attractionTypeFilter: "",
    includeAccompaniedSize: false,
    maximalSize: 190,
  });

  useEffect(() => {
    console.log(filteredAttractions);
    axios
      .get("http://localhost:3000/attractions")
      .then((response) => {
        setAttractions(response.data);
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de la récupération des données",
          error
        );
      });
  }, [filteredAttractions]);

  const filteredAttractionsList = useMemo(() => {
    let filteredList = attractions;

    // Filter by type
    const filter = filteredAttractions.attractionTypeFilter;
    if (filter) {
      filteredList = filteredList.filter(
        (attraction) => attraction[filter] === 1
      );
    }

    // Filter by name
    filteredList = filteredList.filter((attraction) =>
      attraction.nomAttraction.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by size
    filteredList = filteredList.filter((attraction) => {
      if (filteredAttractions.includeAccompaniedSize) {
        return (
          (attraction.tailleMinRequise !== null &&
            attraction.tailleMinRequise <= filteredAttractions.maximalSize) ||
          (attraction.tailleMinRequiseAccomp !== null &&
            attraction.tailleMinRequiseAccomp <=
              filteredAttractions.maximalSize)
        );
      } else {
        return (
          attraction.tailleMinRequise !== null &&
          attraction.tailleMinRequise <= filteredAttractions.maximalSize
        );
      }
    });

    // Sort
    switch (sortItem) {
      case "scaleUp":
        filteredList.sort((a, b) =>
          a.tailleMinRequise > b.tailleMinRequise ? 1 : -1
        );
        break;
      case "scaleDown":
        filteredList.sort((a, b) =>
          a.tailleMinRequise < b.tailleMinRequise ? 1 : -1
        );
        break;
      default:
        break;
    }

    return filteredList;
  }, [attractions, filteredAttractions, searchTerm, sortItem]);

  return (
    <div className="attractions__wrapper">
      <p>Accueil &gt; Attractions</p>
      <h1>Attractions</h1>
      <div className="attractions__content">
        <Sidebar
          filteredAttractions={filteredAttractions}
          setFilteredAttractions={setFilteredAttractions}
        />
        <div className="attractions__main">
          <div className="attractions__filtering">
            <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Sort sortItem={sortItem} setSortItem={setSortItem} />
          </div>
          <div className="attraction__wrapper">
            {filteredAttractionsList.map((attraction, index) => (
              <Attraction key={index} attraction={attraction} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attractions;
