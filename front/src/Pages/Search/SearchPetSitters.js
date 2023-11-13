import React, { useEffect, useState } from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CardUser from "../../Components/Cards/CardUser.js";
import axios from "axios";

const SearchPetSitters = () => {
  const [sitters, setSitters] = useState([]);

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_API}/sitters`).then((res) => {
      setSitters(res.data);
      console.log('set last Sitters', res.data);
    });

  }, []);

  return (
    <>
      <section className="search__banner">
        <section id="search" className="search__bar">
          <select className="select" name="species" id="species">
            <option value="all">Espèces</option>
            <option value="short-term"></option>

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
      {sitters.map((sitter, i) => (
            <CardUser key={i} oneSitter ={sitter}/>
            ))}
      </section>
    </>
  );
};

export default SearchPetSitters;
