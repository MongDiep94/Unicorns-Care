import express from "express";
import {
  GetLastPets,
  GetOnePet,
  GetAllPets,
  NewPet,
  UpdatePet,
  DeletePet,
  GetRandomPet,
} from "../controllers/petController.js";
import upload from "../middlewares/multer.js";

const petRouter = express.Router();

// RECUPERER TOUTES LES CREATURES
petRouter.get("/pets", GetAllPets);

// RECUPERER LES 3 DERNIERES CREATURES ENREGISTREES
petRouter.get("/last-pets", GetLastPets);

// RECUPERER UNE SEULE CREATURE
petRouter.get("/pet/:petId", GetOnePet);

// RECUPERER RANDOM CREATURE
petRouter.get("/random-pets", GetRandomPet);

// CREER UNE CREATURE
petRouter.post("/pet/create", upload.single('file'), NewPet);

// METTRE A JOUR UNE CREATURE
petRouter.patch("/pet/update/:petId", upload.single('file'), UpdatePet);

// SUPPRIMER UNE CREATURE
petRouter.delete("/pet/delete/:petId", DeletePet);

export default petRouter;
