import React from "react";
import "../../css/styles.css";

const CardTestimonial = ({ testimonials }) => {
  return (
    <article className="testimony__content">
      <img
        className="testimony__photo"
        src={`${process.env.REACT_APP_API}/images/users/tohya.png`}
        alt="Photo pet-sitter Tohya Sakuria"
        aria-label="Photo pet-sitter Tohya Sakuria"
      />
      <h2>Tohya Sakuria</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Quis auctor elit sed
        vulputate mi sit amet mauris.
      </p>
      <p className="testimony__owner">
        Mara, propriétaire de Nini, Octobre 2023
      </p>
    </article>
  );
};

export default CardTestimonial;
