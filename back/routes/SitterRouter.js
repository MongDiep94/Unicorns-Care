import express from "express";
import {
  GetLastSitters,
  GetOneSitter,
  GetAllSitters,
  NewSitter,
  UpdateSitter,
  DeleteSitter,
} from "../controllers/sitterController.js";

const sitterRouter = express.Router();

// RECUPERER TOUS LES SITTERS
sitterRouter.get("/sitters", GetAllSitters);

// RECUPERER LES 3 DERNIERS SITTERS ENREGISTRES
sitterRouter.get("/last-sitters", GetLastSitters);

// RECUPERER UN SEUL SITTER
sitterRouter.get("/sitter/:id", GetOneSitter);

// CREER UN SITTER
sitterRouter.post("/create-sitter", NewSitter);

// METTRE A JOUR UN SITTER
sitterRouter.patch("/update-sitter/:sitterId", UpdateSitter);

// SUPPRIMER UN SITTER
sitterRouter.delete("/delete-sitter/:sitterId", DeleteSitter);


export default sitterRouter;
