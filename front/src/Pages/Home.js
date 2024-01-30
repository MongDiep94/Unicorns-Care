import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import Banner from "../Components/Banner.js";
import CardUser from "../Components/Cards/CardUser.js";
import CardPet from "../Components/Cards/CardPet.js";
import CardTestimonial from "../Components/Cards/CardTestimonial.js";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  // settings slider Slick
  const settings = {
    arrows: false,
    dots: true,
    fade: true,
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [lastPets, setLastPets] = useState([]);
  const [lastSitters, setLastSitters] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/last-pets`).then((res) => {
      setLastPets(res.data);
    });

    axios.get(`${process.env.REACT_APP_API}/last-sitters`).then((res) => {
      setLastSitters(res.data);
    });
  }, []);

  return (
    <>
      <Banner />
      <main>
        <section className="petsitters">
          <h1>
            <img
              className="arabesque1--before"
              src={`../images/pictos/arabesque1_g_orange.svg`}
              alt={`arabesque décorative`}
            />
            Découvrez vos Pet Sitters
            <img
              className="arabesque1--after"
              src={`../images/pictos/arabesque1_d_orange.svg`}
              alt={`arabesque décorative`}
            />
          </h1>
          <div className="container cards">
            {lastSitters.map((lastSitter, i) => (
              <CardUser key={i} oneSitter={lastSitter} />
            ))}
          </div>
          <NavLink
            to="/recherche-sitters"
            className="btn__seeMore btn__seeMore--orange"
            aria-label="Lien pour aller sur la page de recherche de tous les sitters"
          >
            Voir plus de profils
          </NavLink>
        </section>
        <section className="creatures">
          <h1>
            <img
              className="arabesque2--before"
              src={`../images/pictos/arabesque5_g_cream.svg`}
              alt={`arabesque décorative`}
            />
            Découvrez nos créatures à garder
            <img
              className="arabesque2--after"
              src={`../images/pictos/arabesque5_d_cream.svg`}
              alt={`arabesque décorative`}
            />
          </h1>
          <div className="container cards">
            {lastPets.map((lastPet, i) => (
              <CardPet key={i} onePet={lastPet} />
            ))}
          </div>
          <NavLink
            to="/recherche-creatures"
            className="btn__seeMore btn__seeMore--cream"
            aria-label="Lien pour aller sur la page de recherche de toutes lescréatures"
          >
            Voir plus de créatures
          </NavLink>
        </section>
        <section className="testimonials">
          <h1 className="chapo green">Les témoignages</h1>
          <div className="container margin-bottom-5">
            <Slider {...settings}>
              <CardTestimonial />
              <CardTestimonial />
              <CardTestimonial />
            </Slider>
          </div>
          <span className="testimonials__end"></span>
        </section>
      </main>
    </>
  );
};

export default Home;
