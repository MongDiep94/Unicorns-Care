import React from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CardUser from "../../Components/Cards/CardUser.js";

const SearchPetSitters = () => {
  return (
    <>
      <section className="search__banner">
        <section id="search" className="search__bar">
          <select className="select" name="duration" id="duration">
            <option value="all">Toutes durées</option>
            <option value="short-term">1 - 3 jours</option>
            <option value="long-term">3 - 5+ jours</option>
          </select>
          <p className="arrows">&gt; &gt; &gt;</p>
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
      <CardUser />
      <CardUser />
      <CardUser />
      <CardUser />
      <CardUser />
      <CardUser />
      <CardUser />
      <CardUser />
      </section>
    </>
  );
};

export default SearchPetSitters;
