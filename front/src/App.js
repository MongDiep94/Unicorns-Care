import { Route, Routes } from "react-router-dom";

import "./App.css";
import WithoutHearder from "./Components/WithoutHeader.js";
import WithHeader from "./Components/WithHeader.js";

import Home from "./Components/Home.js";
import Login from "./Components/Login.js";
import Contact from "./Components/Contact.js";
import SearchPetSitters from "./Components/SearchPetSitters.js";
import SearchCreatures from "./Components/SearchCreatures.js";
import NotFound from "./Components/NotFound.js";
import LegalNotice from "./Components/LegalNotice.js";
import ProfilSitter from "./Components/ProfilSitter.js";

function App() {
  return (
    <Routes>
      <Route element={<WithoutHearder />}>
        <Route path="/login" element={<Login />} />
        <Route path="*" exact={true} element={<NotFound />} />
      </Route>
      <Route element={<WithHeader />}>
        <Route path="/" element={<Home />} />
        <Route path="/profil-sitter" element={<ProfilSitter />} />
        <Route path="/recherche-sitters" element={<SearchPetSitters />} />
        <Route path="/recherche-creatures" element={<SearchCreatures />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentions-legales" element={<LegalNotice />} />
      </Route>
    </Routes>
  );
}

export default App;
