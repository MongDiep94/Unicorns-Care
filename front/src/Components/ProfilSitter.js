import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";

const ProfilSitter = () => {
  return (
    <>
      <div className="bg--green"></div>
      <section className="container">
        <section className="profil__sitter">
          <article className="sitter__img">
            <img
              src="../../images/users/tohya.png"
              alt="Photo pet-sitter Tohya Sakuria"
              aria-label="Photo pet-sitter Tohya Sakuria"
            />
          </article>
          <article className="sitter__infos">
            <h1 className="green">Tohya Sakuria</h1>
            <p>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="margin-right-1 orange"
              />
              Paris 20e
            </p>
            <section className="sitter__rating">
              <p>6 avis</p>
              <p>
                <FontAwesomeIcon icon={faStar} className="gold" /> 5/5
              </p>
            </section>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              auctor elit sed vulputate mi sit amet mauris.
            </p>
            <h2 className="style-h3 orange">Préférences d'espèce</h2>
            <section className="sitter__specie">
              <p className="box bg--color-grey">Specie</p>
              <p className="box bg--color-grey">Specie</p>
              <p className="box bg--color-grey">Specie</p>
            </section>
          </article>
          <article className="sitter_availability">
            <section>
              <table>
                <thead>
                  <tr>
                    <th colspan="2">Disponibilités</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>lundi &gt; vendredi</td>
                    <td>07:00 &gt; 20:00</td>
                  </tr>
                  <tr>
                    <td>samedi &gt; dimanche</td>
                    <td>09:00 &gt; 22:00</td>
                  </tr>
                </tbody>
              </table>
            </section>
            <NavLink to="#" className="btn__orange">
              Contacter
            </NavLink>
          </article>
        </section>

        <section className="sitter__details">
          <section className="sitter__reviews">
            <article className="review__card">
              <img
                className="review__photo"
                src=".../../images/users/mara.png"
                alt="Photo propriétaire Mara"
                aria-label="Photo propriètaire Mara"
              />
              <section>
                <p className="review__rating">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </p>
                <h3 className="size-text">Mara, propiétaire de Nini</h3>
                <p className="review__date">Octobre 2023</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis auctor elit sed vulputate mi sit amet mauris.
                </p>
              </section>
            </article>
            <article className="review__card">
              <img
                className="review__photo"
                src=".../../images/users/mara.png"
                alt="Photo propriétaire Mara"
                aria-label="Photo propriètaire Mara"
              />
              <section>
                <p className="review__rating">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </p>
                <h3 className="size-text">Mara, propiétaire de Nini</h3>
                <p className="review__date">Octobre 2023</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis auctor elit sed vulputate mi sit amet mauris.
                </p>
              </section>
            </article>
          </section>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1222073449103!2d106.77590781537452!3d-6.2476228629146675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f11b12c11ab7%3A0xcd48f5c775249316!2sHumanity%20First%20Indonesia!5e0!3m2!1sid!2sid!4v1605684563677!5m2!1sid!2sid"
            aria-hidden="false"
            title="Adresse Tohya"
          />
        </section>
      </section>
    </>
  );
};

export default ProfilSitter;
