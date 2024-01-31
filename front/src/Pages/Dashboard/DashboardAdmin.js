import "../../css/styles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalUpdate from "../../Components/ModalUpdate.js";

const DashboardAdmin = () => {
  const [users, setUsers] = useState([]);
  const [deletedUserId, setDeletedUserId] = useState(null);

  // Modals state
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/users`).then((res) => {
      setUsers(res.data);
    });
  }, [deletedUserId]); // Ecoute les changements sur deletedUserId

  const handleUpdate = (e) => {
    setOpenModal(true);
  };

  const handleDelete = async (userId) => {
    console.log("userId", userId);

    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce profil ?"
    );

    if (!confirmed) {
      return;
    }

    try {
      if (!userId) {
        console.error("L'utilisateur est introuvable.");
        return;
      }

      await axios.delete(`${process.env.REACT_APP_API}/user/delete/${userId}`);
      // Remet à jour la liste des users sans le user supprimé
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      // l'id du user supprimer force le reload du tableau utilisateurs
      setDeletedUserId(userId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <main className="admin__container">
        <h1 className="dashboard__title">Bonjour Admin</h1>
        <table>
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
              users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <>
                    {user.photo ? (
                      <img
                      className="table__admin__photo"
                      src={`${process.env.REACT_APP_API}/images/users/${user.photo}`}
                      alt={`Photo de ${user.firstName}`}
                      />
                    ) : (
                      <img
                      className="table__admin__photo"
                      src={`${process.env.REACT_APP_API}/images/avatar_licorne.svg`}
                      alt={`Photo de ${user.firstName}`}
                      />
                    )
                    }
                    </>
                  </td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.pet && user.pet.name}</td>
                  <td>
                    <button className="update" onClick={handleUpdate}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    {openModal && <ModalUpdate closeModal={setOpenModal} />}
                  </td>
                  <td>
                    <button
                      className="delete"
                      onClick={() => handleDelete(user._id)}
                    >
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
