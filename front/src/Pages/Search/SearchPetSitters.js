import React, { useEffect, useState } from "react";
import "../../css/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CardUser from "../../Components/Cards/CardUser.js";
import axios from "axios";

const SearchPetSitters = ({ oneSitter }) => {
  const [allSitters, setAllSitters] = useState([]);
  const [initialAllSitters, setInitialAllSitters] = useState([]);
  const [species, setSpecies] = useState([]);
  const [searchInput, setSearchInput] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/sitters`).then((res) => {
      setAllSitters(res.data);
      setInitialAllSitters(res.data);

      // Récupérer toutes les différentes espèces uniques
      const allSpecies = [
        ...new Set(res.data.flatMap((sitter) => sitter.species)),
      ];
      setSpecies(allSpecies);
    });
  }, []);

  const handleSpeciesChange = (e) => {
    const selectedSpecie = e.target.value;
    // Filtrer les Pets, basé sur le choix du selectedSpecies
    setAllSitters(
      selectedSpecie === "all"
        ? initialAllSitters
        : initialAllSitters.filter(
            (sitter) =>
              sitter.species && sitter.species.includes(selectedSpecie)
          )
    );
    // Vider l'input quand on choisit une espèce
    setSearchInput([]);
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    const searchName = e.target.value;
    // Filtrer les Sitters, basé sur le choix du searchName
    const filteredSitters =
      searchName === "all"
        ? initialAllSitters
        : initialAllSitters.filter(
            (sitter) =>
            sitter.user &&
            sitter.user.firstName &&
            sitter.user.lastName &&
            (sitter.user.firstName.toLowerCase().includes(searchName.toLowerCase()) ||
              sitter.user.lastName.toLowerCase().includes(searchName.toLowerCase()))
          );
    setSearchInput(filteredSitters);
  };

  return (
    <>
      <section id="search" className="search__banner">
        <select
          name="species"
          id="species"
          onChange={handleSpeciesChange}
        >
          <option value="all">Espèces</option>
          {species.map((specie, i) => (
            <option key={i} value={specie}>
              {specie}
            </option>
          ))}
        </select>
        <span className="separator">|</span>
        <div className="search__bar">
          <form action="" method="get">
            <input
              type="search"
              name="search_name"
              id="search_name"
              placeholder="Chercher un pet sitter par le nom"
              onChange={handleSearchChange}
            />
          </form>
          <button title="bouton Rechercher">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="cream" />
          </button>
        </div>
      </section>

      <section className="container cards">
      {searchInput.length > 0
          ? searchInput.map((sitter) => (
              <CardUser key={sitter._id} oneSitter={sitter} />
            ))
          : allSitters.map((sitter) => (
              <CardUser key={sitter._id} oneSitter={sitter} />
            ))}
      </section>
    </>
  );
};

export default SearchPetSitters;
