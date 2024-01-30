import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const CardOwnerReviewer = ({ ownerReviewer }) => {
  // Décomposition + condition d'objet vide si pas de données
  const { name, owner } = ownerReviewer || {};
  const { firstName, photo } = owner[0] || {};

  return (
    <article className="review__card">
      <img
        src={`${process.env.REACT_APP_API}/images/users/${photo}`}
        alt={`Photo reviewer ${firstName}`}
      />
      <div>
        <p className="review__rating">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </p>
        <h3 className="size-text">
          {firstName && firstName.length > 0 && firstName}, propiètaire de{" "}
          {name}
        </h3>
        <p className="review__date">Juillet 2023</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
          auctor elit sed vulputate mi sit amet mauris.
        </p>
      </div>
    </article>
  );
};

export default CardOwnerReviewer;
