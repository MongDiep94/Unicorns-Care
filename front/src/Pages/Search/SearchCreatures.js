import React from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CardPet from "../../Components/Cards/CardPet.js";

const SearchCreatures = () => {
  return (
    <>
      <section className="search__banner">
        <section id="search" className="search__bar">
          <select className="element select" name="element" id="element">
            <option value="all">Eléments</option>
            <option value="fire">Feu</option>
            <option value="water">Eau</option>
            <option value="earth">Terre</option>
            <option value="wind">Air</option>
            <option value="ice">Glace</option>
          </select>
          <p className="arrows">&gt; &gt;</p>
          <select className="specie select" name="specie" id="specie">
            <option value="all">Espèces</option>
            <option value="fire">Equidés</option>
            <option value="water">Félins</option>
            <option value="earth">Canidés</option>
            <option value="wind">Ornithos</option>
            <option value="ice">Sauropsides</option>
          </select>
          <p className="arrows">&gt; &gt;</p>
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
        <CardPet />
        <CardPet />
        <CardPet />
        <CardPet />
        <CardPet />
        <CardPet />
        <CardPet />
        <CardPet />
      </section>
    </>
  );
};

export default SearchCreatures;
