import React, { useEffect, useState } from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CardPet from "../../Components/Cards/CardPet.js";
import axios from "axios";

const SearchCreatures = () => {
  const [allPets, setAllPets] = useState([]);
  const [initialAllPets, setInitialAllPets] = useState([]);
  const [species, setSpecies] = useState([""]);
  const [elements, setElements] = useState([""]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/pets`).then((res) => {
      setAllPets(res.data);
      setInitialAllPets(res.data);

      // Récupérer toutes les différentes espèces uniques
      const uniqueSpecies = [...new Set(res.data.map((pet) => pet.specie))];
      setSpecies(uniqueSpecies);
      // Récupérer tous les différents éléments uniques
      const uniqueElements = [...new Set(res.data.map((pet) => pet.element))];
      setElements(uniqueElements);

      console.log("set all Pets", res.data);
      console.log("set Species", uniqueSpecies);
      console.log("set Species", uniqueElements);
    });
  }, []);

  const handleSpeciesChange = (e) => {
    const selectedSpecie = e.target.value;
    // Filtrer les Pets basé sur le choix du selectedSpecies
    setAllPets(
      selectedSpecie === "all"
        ? initialAllPets
        : initialAllPets.filter((pet) => pet.specie === selectedSpecie)
    );
  };

  const handleElementsChange = (e) => {
    const selectedElement = e.target.value;
    // Filtrer les Elements basé sur le choix du selectedElements
    setAllPets(
      selectedElement === "all"
        ? initialAllPets
        : initialAllPets.filter((pet) => pet.element === selectedElement)
    );
  };

  return (
    <>
      <section className="search__banner">
        <section id="search" className="search__bar">
          <select
            className="select"
            name="elements"
            id="elements"
            onChange={handleElementsChange}
          >
            <option value="all">Elements</option>
            {elements.map((element, i) => (
              <option key={i} value={element}>
                {element}
              </option>
            ))}
          </select>
          <span className="separator">|</span>
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
              placeholder="Chercher une créature par son nom"
            />
          </form>
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="green" />
          </button>
        </section>
      </section>
      <section className="container cards">
        {allPets.map((pet) => (
          <CardPet key={pet._id} onePet={pet} />
        ))}
      </section>
    </>
  );
};

export default SearchCreatures;
