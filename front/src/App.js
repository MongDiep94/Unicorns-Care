import { Route, Routes } from "react-router-dom";

import "./App.css";
import WithoutHearder from "./Components/WithoutHeader.js";
import WithHeader from "./Components/WithHeader.js";

import Login from "./Pages/Log/Login.js";
import NotFound from "./Pages/NotFound/NotFound.js";
import Home from "./Pages/Home/Home.js";
import ProfilSitter from "./Pages/Profils/ProfilSitter.js";
import SearchCreatures from "./Pages/Search/SearchCreatures.js";
import SearchPetSitters from "./Pages/Search/SearchPetSitters.js"
import Contact from "./Pages/Contact/Contact.js";
import LegalNotice from "./Pages/LegalNotice/LegalNotice.js"
import ProfilPet from "./Pages/Profils/ProfilPet.js";
import { useState } from "react";



function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")

  return (
    <Routes>
      <Route element={<WithoutHearder />}>
        <Route path="/se-connecter" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        <Route path="*" exact={true} element={<NotFound />} />
      </Route>
      <Route element={<WithHeader />}>
        <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
        <Route path="/recherche-sitters" element={<SearchPetSitters />} />
        <Route path="/profil-sitter/:id" element={<ProfilSitter />} />

        <Route path="/recherche-creatures" element={<SearchCreatures />} />
        <Route path="/profil-pet/:id" element={<ProfilPet />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentions-legales" element={<LegalNotice />} />
      </Route>
    </Routes>
  );
}

export default App;
