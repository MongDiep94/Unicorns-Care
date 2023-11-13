import React, { useEffect, useState } from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CardPet from "../../Components/Cards/CardPet.js";
import axios from "axios";

const SearchCreatures = () => {
  const [allPets, setAllPets] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/pets`).then((res) => {
      setAllPets(res.data);
      console.log('set all Pets', res.data);
    });

  }, []);

  return (
    <>
      <section className="search__banner">
        <section id="search" className="search__bar">
          <select className="select" name="elements" id="elements">
            <option value="all">Eléments</option>
            <option value="fire">Feu</option>
            <option value="water">Eau</option>
            <option value="earth">Terre</option>
            <option value="wind">Air</option>
            <option value="ice">Glace</option>
          </select>
          <span className="separator">|</span>
          <select className="select" name="species" id="species">
            <option value="all">Espèces</option>
            <option value="fire">Equidés</option>
            <option value="water">Félins</option>
            <option value="earth">Canidés</option>
            <option value="wind">Ornithos</option>
            <option value="ice">Sauropsides</option>
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
        {allPets.map((pet, i) => (
          <CardPet key={i} onePet={pet} />
        ))}
      </section>
    </>
  );
};

export default SearchCreatures;
