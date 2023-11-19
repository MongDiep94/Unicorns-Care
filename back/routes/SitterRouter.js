import express from "express";
import {
  GetLastSitters,
  GetOneSitter,
  GetAllSitters,
  NewSitter,
  UpdateSitter,
  DeleteSitter,
  GetRandomSitter,
} from "../controllers/sitterController.js";

const sitterRouter = express.Router();

// RECUPERER TOUS LES SITTERS
sitterRouter.get("/sitters", GetAllSitters);

// RECUPERER LES 3 DERNIERS SITTERS ENREGISTRES
sitterRouter.get("/last-sitters", GetLastSitters);

// RECUPERER UN SEUL SITTER
sitterRouter.get("/sitter/:id", GetOneSitter);

// RECUPERER RANDOM SITTER
sitterRouter.get("/random-sitters", GetRandomSitter);

// CREER UN SITTER
sitterRouter.post("/sitter/create", NewSitter);

// METTRE A JOUR UN SITTER
sitterRouter.patch("/sitter/update/:sitterId", UpdateSitter);

// SUPPRIMER UN SITTER
sitterRouter.delete("/sitter/delete/:sitterId", DeleteSitter);


export default sitterRouter;
