import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import './css/styles.css';
import WithoutHearder from "./Components/WithoutHeader.js";
import WithHeader from "./Components/WithHeader.js";

import Login from "./Pages/Log/Login.js";
import Register from "./Pages/Log/Register.js";
import NotFound from "./Pages/NotFound.js";
import Home from "./Pages/Home.js";
import ProfilSitter from "./Pages/Profils/ProfilSitter.js";
import SearchCreatures from "./Pages/Search/SearchCreatures.js";
import SearchPetSitters from "./Pages/Search/SearchPetSitters.js"
import Contact from "./Pages/Contact.js";
import LegalNotice from "./Pages/LegalNotice.js"
import ProfilPet from "./Pages/Profils/ProfilPet.js";
import DashboardUser from "./Pages/Dashboard/DashboardUser/DashboardUser.js";
import DashboardAdmin from "./Pages/Dashboard/DashboardAdmin.js";


function App() {

  return (
    <Routes>
      <Route element={<WithoutHearder />}>
        <Route path="/se-connecter" element={<Login />} />
        <Route path="/s-inscrire" element={<Register />} />
        <Route path="*" exact={true} element={<NotFound />} />
      </Route>
      <Route element={<WithHeader />}>
        <Route path="/" element={<Home />} />
        <Route path="/recherche-sitters" element={<SearchPetSitters />} />
        <Route path="/profil-sitter/:id" element={<ProfilSitter />} />
        <Route path="/recherche-creatures" element={<SearchCreatures />} />
        <Route path="/profil-pet/:id" element={<ProfilPet />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentions-legales" element={<LegalNotice />} />
        <Route path="/dashboard/:id" element ={<DashboardUser />} />
        <Route path="/dashboard/admin" element ={<DashboardAdmin />} />
      </Route>
    </Routes>
  );
}

export default App;
