import React, { useEffect, useState } from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CardUser from "../../Components/Cards/CardUser.js";
import axios from "axios";

const SearchPetSitters = () => {
  const [allSitters, setAllSitters] = useState([]);
  const [initialAllSitters, setInitialAllSitters] = useState([]);
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/sitters`).then((res) => {
      setAllSitters(res.data);
      setInitialAllSitters(res.data.s);

      // Récupérer toutes les différentes espèces uniques
      const uniqueSpecies = [
        ...new Set(res.data.map((sitter) => sitter.species)),
      ];
      setSpecies(uniqueSpecies);
      console.log("set last Sitters", res.data);
      console.log("set Species", res.data.species);
      console.log("ADDRESS", res.data.address[0].city);
    });
  }, []);

  const handleSpeciesChange = (e) => {
    const selectedSpecie = e.target.value;
    // Filtrer les Pets basé sur le choix du selectedSpecies
    setAllSitters(
      selectedSpecie === "all"
        ? initialAllSitters
        : initialAllSitters.filter((pet) => pet.specie === selectedSpecie)
    );
  };

  return (
    <>
      <section className="search__banner">
        <section id="search" className="search__bar">
          <select
            className="select"
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
          <form action="" method="get">
            <input
              type="text"
              name="search_text"
              id="search_text"
              placeholder="Chercher un pet sitter par le nom"
            />
          </form>
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="green" />
          </button>
        </section>
      </section>
      <section className="container cards">
        {allSitters.map((sitter) => (
          <CardUser key={sitter._id} oneSitter={sitter} />
        ))}
      </section>
    </>
  );
};

export default SearchPetSitters;
