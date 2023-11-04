import express from "express";
import {
  GetLastPets,
  GetOnePet,
  GetAllPets,
  NewPet,
  UpdatePet,
  DeletePet,
} from "../controllers/petController.js";

const petRouter = express.Router();

// RECUPERER TOUTES LES CREATURES
petRouter.get("/pets", GetAllPets);

// RECUPERER LES 3 DERNIERES CREATURES ENREGISTREES
petRouter.get("/last-pets", GetLastPets);

// RECUPERER UNE SEULE CREATURE
petRouter.get("/:petId", GetOnePet);

// CREER UNE CREATURE
petRouter.post("/create-pet", NewPet);

// METTRE A JOUR UNE CREATURE
petRouter.patch("/update-pet/:petId", UpdatePet);

// SUPPRIMER UNE CREATURE
petRouter.delete("/delete-pet/:petId", DeletePet);

export default petRouter;
