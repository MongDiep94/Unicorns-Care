import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import Banner from "../../Components/Banner/Banner.js";
import CardUser from "../../Components/Cards/CardUser.js";
import CardPet from "../../Components/Cards/CardPet.js";
import CardTestimonial from "../../Components/Cards/CardTestimonial.js";

const Home = () => {

    const settings = {
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
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

  return (
    <>
      <Banner />
      <main>
        <section className="petsitters">
          <h1 className="arabesque1 orange">Découvrez vos Pet Sitters</h1>
          <section className="container cards">
            <CardUser />
            <CardUser />
            <CardUser />
          </section>
          <NavLink to="/recherche-sitters" className="btn__seeMore--orange">
            Voir plus de profils
          </NavLink>
        </section>
        <section className="creatures">
          <h1 className="arabesque2 cream">Découvrez nos créatures à garder</h1>
          <section className="container cards">
            <CardPet />
            <CardPet />
            <CardPet />
          </section>
          <NavLink to="/recherche-creatures" className="btn__seeMore--cream">
            Voir plus de créatures
          </NavLink>
        </section>
        <section className="testimonials">
          <h1 className="chapo green">Les témoignages</h1>
          <section className="container margin-bottom-5">
            <Slider {...settings}>
              <CardTestimonial />
              <CardTestimonial />
              <CardTestimonial />
            </Slider>
          </section>
          <span className="testimonials__end"></span>
        </section>
      </main>
    </>
  );
};

export default Home;
