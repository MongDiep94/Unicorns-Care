import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalUpdate from "../../Components/Modals/ModalUpdate.js";

const DashboardAdmin = () => {
  const [users, setUsers] = useState([]);
  // Modals state
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_API}/users`).then((res) => {
      setUsers(res.data);
    });
  }, []); // rechargement 1 fois



  const handleUpdate = (e, ) => {
    setOpenModal(true);
  };

  const handleDelete = (e) => {

  };

  return (
    <>
      <div className="bg--green"></div>

      <main className="admin__container">
        <h1 className="dashboard__title">Bonjour Admin</h1>
        <table className="admin">
          <thead>
            <tr>
              <th></th>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Créature</th>
              <th colSpan="2"></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((user, _id) => (
                <tr key={_id}>
                  <td>
                    <img
                      className="table__admin__photo"
                      src={`${process.env.REACT_APP_API}/images/users/${user.photo}`}
                      alt={`Photo de ${user.firstName}`}
                    />
                  </td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.pet && user.pet.name}</td>
                  <td>
                    <button
                    aria-label="bouton pour modifier"
                    className="update"
                    onClick={handleUpdate}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    {openModal && <ModalUpdate closeModal={setOpenModal}/>}
                  </td>
                  <td>
                    <button
                    aria-label="bouton pour supprimer"
                    className="delete"
                    onClick={handleDelete}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default DashboardAdmin;
