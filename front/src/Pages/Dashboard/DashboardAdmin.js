import "./Dashboard.css";

import React from "react";

const DashboardAdmin = () => {
  return (
    <>
      <div className="bg--green"></div>

      <h1>Bonjour Admin</h1>
      <table>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Créature</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>firstName</td>
            <td>lastName</td>
            <td>pet.name</td>
            <td>modifer</td>
            <td>supprimer</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default DashboardAdmin;
