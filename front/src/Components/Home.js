import { NavLink } from "react-router-dom";
import Banner from "./Banner.js";
import CardUser from "./CardUser.js";
import CardPet from "./CardPet.js";
import CardTestimonial from "./CardTestimonial.js";

const Home = () => {
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
          <section className="container">
            <CardTestimonial />
          </section>
        </section>
      </main>
    </>
  );
};

export default Home;
